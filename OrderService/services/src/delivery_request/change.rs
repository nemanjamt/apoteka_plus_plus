extern crate rocket;
extern crate diesel;
use models::delivery_request::{DeliveryRequest};
use shared::response_models::{ApiResponse};
use infrastructure::establish_connection;
use diesel::result::Error;



pub fn approve_delivery_request(request_id: i32)-> ApiResponse<DeliveryRequest> {
    let connection = &mut establish_connection();
    let found_delivery_request = match repositories::delivery_request::find_by_id(connection, request_id){
        Ok(res) => res,
        //ovde razdvojiti slucaj 404 i 500(svaka druga greska)
        Err(_) => {
            let api_response = ApiResponse {
                success: false,
                status_code: 404, 
                data: None,
                message: "Delivery request with specified id does not exists".to_string()
            };
            return api_response;
        }
    };
        
 
    match repositories::order::add_deliverer_and_status(connection, found_delivery_request.order_id,
                                                        found_delivery_request.deliverer_id, "DELIVERY_IN_PROGRESS".to_string()){
            Ok(_) => {},
            Err(Error::NotFound)=>{
                let response = ApiResponse{
                    success:false,
                    status_code:404,
                    data: None,
                    message:"Order with specified id does not exists".to_string()
                };
                return response
            },
            Err(_)=>{
                let response = ApiResponse{
                    success:false,
                    status_code:500,
                    data: None,
                    message:"Internal error".to_string()
                };
                return response;
            }
    }
   
    
    let response = ApiResponse{
        success:true,
        status_code:200,
        data: None,
        message:"OK".to_string()
    };
    response

}