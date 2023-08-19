extern crate diesel;
use models::order::{Order, OrderItem, OrderWithItems, NewOrder, NewOrderItem, OrderCreateRequest};
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

pub fn create_order(request: Validated<Json<OrderCreateRequest>>) -> ApiResponse<OrderWithItems> {

    //provjera da li postoji user sa tim id-em i da li postoji deliverer sa tim id-em
    //proci kroz sve item-e i provjeriti da li referenciju postojeci proizvod!
    let order_create_request = request.into_inner().into_inner();
    let current_datetime: chrono::NaiveDateTime = Local::now().naive_local();
    let new_order = NewOrder{
        user_id: order_create_request.user_id,
        address: order_create_request.address,
        deliverer_id: order_create_request.deliverer_id,
        delivery: order_create_request.delivery,
        order_status: "CREATED".to_string(),
        created_at: current_datetime,
        finished_at: None,
        note: order_create_request.note
    };
    let connection = &mut establish_connection();
    let result = match connection.transaction(|connection| {

        let created_order : Order =  repositories::order::create_order(connection, new_order)?;
        let create_order_items_request: Vec<NewOrderItem> = order_create_request.items
                                                .iter()
                                                .map(|item| NewOrderItem {
                                                    quantity: item.quantity,
                                                    product_id: item.product_id,
                                                    price: item.price,
                                                    order_id: created_order.id, 
                                                })
                                                .collect();
        
        let created_items =  repositories::order_item::create_order_items(connection, created_order.id, create_order_items_request)?;
        let result =  OrderWithItems {
            id: created_order.id,
            user_id: created_order.user_id,
            address: created_order.address,
            order_status: created_order.order_status,
            deliverer_id: created_order.deliverer_id,
            delivery: created_order.delivery,
            created_at: created_order.created_at,
            finished_at: created_order.finished_at,
            note: created_order.note,
            items: created_items,
        };
        diesel::result::QueryResult::Ok(result)                        
    }) 
    {
        Ok(res) => res,
        Err(err) => {
            let api_response = ApiResponse {
                success: false,
                status_code: 500,
                data: None,
                message: "Internal error".to_string(),
            };

            return api_response;
        }
    };


    let response = ApiResponse{
        success: true,
        status_code: 201,
        data: Some(result),
        message: "Order successful created".to_string()
    };

    response
}





