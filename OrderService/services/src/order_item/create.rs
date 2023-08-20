
use models::order::{ OrderItem, NewOrderItem};
use shared::response_models::{ApiResponse};
use infrastructure::establish_connection;
use rocket::serde::json::Json;
use rocket_validation::{ Validated};
use diesel::result::Error;


pub fn create_order_item(order_item_request:Validated<Json<NewOrderItem>>)-> ApiResponse<OrderItem> {
    
    let new_order_item = order_item_request.into_inner().into_inner();
    let connection = &mut establish_connection();
     //provjera da li vec postoji order sa navedenim productom
    match repositories::order::find_order_by_id(connection, new_order_item.order_id){
        Ok(_)=>{},
        Err(Error::NotFound)=>{
            let response = ApiResponse{
                success:false,
                status_code:404,
                data:None,
                message:"Order with specified id does not exists".to_string()
            };
            return response;
        },
        Err(_)=>{
            let response = ApiResponse{
                success:false,
                status_code:500,
                data:None,
                message:"Internal error".to_string()
            };
            return response;
        }
    };
    //provjera da li postoji order_item sa vec istim product_id-em i order_id-em
    match repositories::order_item::find_order_items_by_order_id_and_product_id(connection, new_order_item.order_id, new_order_item.product_id){
        Ok(order_item)=>{
            match repositories::order_item::change_quantity(connection, order_item.id, new_order_item.quantity+order_item.quantity){
                Ok(order_item) => {
                    let response = ApiResponse{
                        success:true,
                        status_code:201,
                        data:Some(order_item),
                        message:"OK".to_string()
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
            }
        },
        Err(_)=>{}
            
    };
    
    let result = match repositories::order_item::create_order_item(connection, new_order_item){
        Ok(item) => item,
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
    let response= ApiResponse{
        success:true,
        status_code:201,
        data:Some(result),
        message:"Order item successful created".to_string()
    };
    response
}