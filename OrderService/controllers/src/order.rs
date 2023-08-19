
use services::order::*;
use models::order::*;
use shared::response_models::{ApiResponse};
use rocket::{get, post, put, delete};
use rocket::serde::{json::Json};
use rocket_validation::{ Validated};

use rocket::response::status::Custom;
#[get("/order/<order_id>")]
pub fn find_order_by_id(order_id: i32) -> Custom<Json<ApiResponse<OrderWithItems>>> {
    let response = read::find_order_by_id(order_id);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}


#[post("/order", format="application/json", data="<order>")]
pub fn create_order(order: Validated<Json<OrderCreateRequest>>) -> Custom<Json<ApiResponse<OrderWithItems>>>{
    let response = create::create_order(order);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[put("/order/<id>", format="application/json", data="<request>")]
pub fn change_order(id:i32, request: Validated<Json<OrderChangeRequest>>) -> Custom<Json<ApiResponse<OrderWithItems>>>{
    let response = change::change_order(id, request);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[put("/order/<id>/status/<order_status>")]
pub fn change_order_status(id: i32, order_status: String)-> Custom<Json<ApiResponse<Order>>>{

    let response = change::change_status_order(id, order_status);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[delete("/order/<id>")]
pub fn delete_order(id : i32) -> Custom<Json<ApiResponse<()>>> {
    let response = delete::delete_order(id);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

