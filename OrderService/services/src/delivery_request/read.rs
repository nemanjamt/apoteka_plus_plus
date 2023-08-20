extern crate rocket;
extern crate diesel;

use models::delivery_request::{DeliveryRequest,  DeliveryRequestInfo};
use shared::response_models::{ApiResponse};
use infrastructure::establish_connection;
use diesel::prelude::*;
pub fn check_exists_by_order_id_deliverer_id(order_id:i32, deliverer_id:i32) -> ApiResponse<()>{

    let connection = &mut establish_connection();
    match repositories::delivery_request::find_by_deliverer_id_and_order_id(connection, deliverer_id, order_id){
        Ok(_) => {}
        Err(_) => {
            let response = ApiResponse{
                success:false,
                data: None,
                message:"Delivery request not exists for this order id and deliverer id".to_string(),
                status_code: 404
            };
            return response;
        }
    };
    let response  = ApiResponse{
        success:true,
        data: Some(()),
        message:"Delivery request found for this order id and deliverer id".to_string(),
        status_code: 200
    };
    response
}

pub fn find_delivery_requests_by_order_id(order_id:i32) -> ApiResponse<Vec<DeliveryRequestInfo>>{
    let connection = &mut establish_connection();
    //dobavi sve delivery request-ove
    let requests : Vec<DeliveryRequest> = match repositories::delivery_request::find_by_order_id(connection, order_id){
        Ok(requests) => requests,
        Err(_) =>{
            let response = ApiResponse{
                success:false,
                status_code:500,
                message:"Internal error".to_string(),
                data: None
            };
            return response;
        }
    };
    println!("{:?}", requests);
    let mut request_infos: Vec<DeliveryRequestInfo> = Vec::new();

    for request in requests.iter(){
        println!("AAAAA");
        println!("{}",request.order_id);
        let order_address = match repositories::order::find_order_by_id(connection, request.order_id){
            Ok(order) => {order.address},
            Err(_) => {
                let response = ApiResponse {
                    success: false,
                    status_code: 500,
                    message: "Internal error".to_string(),
                    data: None,
                };
                return response;
            }
        };
        let res = DeliveryRequestInfo {
            id: request.id,
            order_id: request.order_id,
            deliverer_id: request.deliverer_id, 
            address: order_address.unwrap_or("".to_string())
        };
        request_infos.push(res);
    }
    
    let response = ApiResponse{
        success:true,
        status_code:200,
        message:"OK".to_string(),
        data: Some(request_infos)
    };
    response
}