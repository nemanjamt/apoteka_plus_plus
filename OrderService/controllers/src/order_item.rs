use services::order_item::*;
use models::order::*;
use shared::response_models::{ApiResponse};
use rocket::{get, post, put, delete};
use rocket::serde::{json::Json};
use rocket_validation::{ Validated};
use rocket::response::status::Custom;


#[put("/order_item/<id>/quantity/<quantity>")]
pub fn change_quantity_order_item(id:i32, quantity: i32) -> Custom<Json<ApiResponse<OrderItem>>>{
    let response = change::change_quantity_order_item(id, quantity);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[delete("/order_item/<id>")]
pub fn delete_order_item(id:i32) -> Custom<Json<ApiResponse<()>>>{
    let response = delete::delete_order_item(id);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[post("/order_item", format="application/json", data="<new_item_request>")]
pub fn create_order_item(new_item_request: Validated<Json<NewOrderItem>>) -> Custom<Json<ApiResponse<OrderItem>>>{
    let response = create::create_order_item(new_item_request);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}