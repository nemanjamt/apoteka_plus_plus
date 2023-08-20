extern crate rocket;
extern crate diesel;
use models::order::{ OrderWithItems};
use shared::response_models::{ApiResponse};
use infrastructure::establish_connection;
use diesel::prelude::*;
use diesel::result::Error;

const DEFAULT_PAGE_SIZE: i64 = 10;


pub fn find_order_by_id(order_id: i32) -> ApiResponse<OrderWithItems> {
    let connection = &mut establish_connection();
    let result = match connection.transaction(|connection| {
        let order = repositories::order::find_order_by_id(connection, order_id)?;
        let order_items = repositories::order_item::find_order_items_by_order_id(connection, order_id)?;
        let order_with_items = OrderWithItems{
                                id:order.id,
                                user_id: order.user_id,
                                address:order.address,
                                note: order.note,
                                order_status: order.order_status,
                                deliverer_id: order.deliverer_id,
                                delivery:order.delivery,
                                created_at: order.created_at,
                                finished_at: order.finished_at,
                                items: order_items
        };
        diesel::result::QueryResult::Ok(order_with_items)
    }) {
        
        Ok(order_with_items) => order_with_items,
        Err(Error::NotFound) => {
            return ApiResponse{
                success: false,
                status_code:404,
                message: "Order not found".to_string(),
                data: None
            };
        },
        Err(_) => {
            return ApiResponse{
                success: false,
                status_code:500,
                message: "Internal error".to_string(),
                data: None
            };
        }

    };
    
    return ApiResponse{
                        success: true,
                        status_code:200,
                        data:Some(result),
                        message:"OK".to_string()
                    };

}
