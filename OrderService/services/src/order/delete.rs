

use shared::response_models::{ApiResponse};
use infrastructure::establish_connection;
use diesel::result::Error;


pub fn delete_order(order_id : i32) -> ApiResponse<()>{
    let connection = &mut establish_connection();

    match repositories::order::delete_order(connection, order_id) {
            Ok(_) => {
                let response = ApiResponse{
                    success: true, 
                    data: None,
                    message:"OK".to_string(),
                    status_code: 200
                };
                return response;
            }
            Err(Error::NotFound) => {
                let response = ApiResponse{
                    success: false, 
                    data: None,
                    message:"Order not found".to_string(),
                    status_code: 404
                };
                return response;
            },
            Err(_) => {
                let response = ApiResponse{
                    success: false, 
                    data: None,
                    message:"Internal error".to_string(),
                    status_code: 500
                };
                return response;
            }
        }
}