use models::order::{ OrderItem};
use shared::response_models::{ApiResponse};
use infrastructure::establish_connection;
use diesel::result::Error;


pub fn change_quantity_order_item(order_item_id:i32, quantity:i32) -> ApiResponse<OrderItem>{
    if quantity<0{
        let response = ApiResponse{
            success:false,
            status_code:400,
            data:None,
            message:"Bad request".to_string()
        };
        return response;
    }
    let connection = &mut establish_connection();
    let result = match repositories::order_item::change_quantity(connection, order_item_id, quantity){
        Ok(order_item) => order_item,
        Err(Error::NotFound)=>{
            let response = ApiResponse{
                success:false,
                status_code:404,
                data:None,
                message:"Order item not found".to_string()
            };
            return response;
        },
        Err(_) => {

            let response = ApiResponse{
                success:false,
                status_code:500,
                data:None,
                message:"Internal error".to_string()
            };
            return response;
        }
    };
    let response = ApiResponse{
        success:true,
        status_code:200,
        data:Some(result),
        message:"Quantity successful changed".to_string()
    };

    response
}