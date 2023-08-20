use shared::response_models::{ApiResponse};
use services::delivery_request::{read, create, change, delete};
use models::delivery_request::{DeliveryRequest, NewDeliveryRequest, DeliveryRequestInfo};
use rocket::{get, post, put, delete};
use rocket::serde::{json::Json};
use rocket_validation::{ Validated};
use rocket::response::status::Custom;

#[post("/delivery_request", format="application/json", data="<request>")]
pub fn create_delivery_request( request: Validated<Json<NewDeliveryRequest>>)-> Custom<Json<ApiResponse<DeliveryRequest>>>{
    let response = create::create_delivery_request(request);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[delete("/delivery_request/<id>")]
pub fn delete_delivery_request( id: i32)-> Custom<Json<ApiResponse<()>>>{
    let response = delete::delete_delivery_request(id);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[get("/delivery_request/exist/<order_id>/<deliverer_id>")]
pub fn find_delivery_request_by_order_id_and_deliverer_id( order_id:i32, deliverer_id:i32)-> Custom<Json<ApiResponse<()>>>{
    let response = read::check_exists_by_order_id_deliverer_id(order_id, deliverer_id);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[get("/delivery_request/<order_id>")]
pub fn find_delivery_requests_by_order_id(order_id:i32)-> Custom<Json<ApiResponse<Vec<DeliveryRequestInfo>>>>{
    let response = read::find_delivery_requests_by_order_id(order_id);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[put("/delivery_request/<request_id>")]
pub fn approve_request(request_id: i32) -> Json<ApiResponse<DeliveryRequest>>{
    let response = change::approve_delivery_request(request_id);
    Json(response)
}