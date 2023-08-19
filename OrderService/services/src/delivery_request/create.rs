extern crate rocket;
extern crate diesel;
use models::order::{Order, OrderItem, OrderWithItems, OrdersQueryParams};
use models::delivery_request::{DeliveryRequest, NewDeliveryRequest};
use shared::response_models::{ApiResponse};
use infrastructure::establish_connection;
use diesel::prelude::*;
use rocket::response::status::NotFound;
use chrono::NaiveDateTime;
use rocket::serde::{json::Json, Deserialize, Serialize};
use rocket_validation::{Validated};




pub fn create_delivery_request(request: Validated<Json<NewDeliveryRequest>>)-> ApiResponse<DeliveryRequest>{
    let connection = &mut establish_connection();
    let create_request = request.into_inner().into_inner();
    //check order exists
    match repositories::order::find_delivery_order_by_id(connection,create_request.order_id){
        Err(_) => {
            let api_response = ApiResponse {
                success: false,
                status_code: 400, 
                data: None,
                message: "Order with specified id does not exists or is not choosed deliverying option".to_string()
            };
            return api_response;
        },
        _ => {}
    }

    match repositories::delivery_request::find_by_deliverer_id_and_order_id(connection,create_request.deliverer_id,create_request.order_id){
        Err(_) => {
            
        },
        Ok(_) => {
            let api_response = ApiResponse {
                success: false,
                status_code: 400, 
                data: None,
                message: "Already exists request for same order by same deliverer".to_string()
            };
            return api_response;
        }
    }


    //check deliverer_id exists



    let created_delivery_request : DeliveryRequest = match repositories::delivery_request::create_delivery_request(connection, create_request)
            {
                Ok(created_request) => created_request,
                Err(err) => {
                    let api_response = ApiResponse {
                        success: false,
                        status_code: 500, 
                        data: None,
                        message: "Error while creating delivery request".to_string()
                    };
                    
                    return api_response;
                }
            };
    let response = ApiResponse{
        success:true,
        status_code:201,
        data: Some(created_delivery_request),
        message:"OK".to_string()
    };
    response

}