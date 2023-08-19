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
use diesel::result::Error;

pub fn delete_delivery_request(delivery_request_id:i32) -> ApiResponse<()> {
    let connection = &mut establish_connection();
    let response = match repositories::delivery_request::delete_delivery_request(connection, delivery_request_id){
        Ok(_) => {
            let api_response = ApiResponse {
                success: true,
                status_code: 200, 
                data: Some(()),
                message: "OK".to_string()
            };
            api_response
        },
        Err(Error::NotFound)=>{
            let api_response = ApiResponse {
                success: false,
                status_code: 404, 
                data: None,
                message: "Delivery request with specified id does not exists".to_string()
            };
            return api_response;
        },
        Err(_)=>{
            let api_response = ApiResponse {
                success: false,
                status_code: 500, 
                data: None,
                message: "Internal error".to_string()
            };
            return api_response;
        }
    };
    response
}