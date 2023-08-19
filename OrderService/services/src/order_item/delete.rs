
use models::order::{Order, OrderItem, OrderWithItems, ChangeOrder, ChangeOrderStatus, NewOrderItem, OrderChangeRequest};
use shared::response_models::{ApiResponse};
use infrastructure::establish_connection;
use diesel::prelude::*;
use diesel::dsl::*;
use diesel::insert_into;
use rocket::response::status::NotFound;
use rocket::serde::json::Json;
use chrono::{Utc, NaiveDateTime,TimeZone, Local};
use rocket_validation::{Validate, Validated};
use chrono_tz::Europe::Paris;
use chrono_tz::Tz;
use diesel::connection::Connection;
use diesel::result::Error;

pub fn delete_order_item(order_item_id : i32) -> ApiResponse<()>{
    let connection = &mut establish_connection();

    match repositories::order_item::delete_order_item(connection, order_item_id) {
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
                    message:"Order item not found".to_string(),
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