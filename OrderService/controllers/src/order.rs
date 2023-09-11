
use services::order::*;
use models::order::*;
use shared::response_models::{ApiResponse};
use rocket::{get, post, put, delete};
use rocket::serde::{json::Json};
use rocket_validation::{ Validated};

use rocket::response::status::Custom;
#[get("/order/<order_id>")]
pub async fn find_order_by_id(order_id: i32) -> Custom<Json<ApiResponse<OrderWithLoadedItems>>> {
    let response = read::find_order_by_id(order_id).await;
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

// #[get("/order/user/<user_id>")]
// pub fn find_orders_by_user_id(user_id: i32) -> Custom<Json<ApiResponse<Vec<OrderWithItems>>>> {
//     let response = read::find_orders_by_user_id(user_id);
//     Custom(rocket::http::Status::new(response.status_code), Json(response))
// }

// #[get("/order/deliverer/<deliverer_id>")]
// pub fn find_orders_by_deliverer_id(deliverer_id: i32) -> Custom<Json<ApiResponse<Vec<OrderWithItems>>>> {
//     let response = read::find_orders_by_deliverer_id(deliverer_id);
//     Custom(rocket::http::Status::new(response.status_code), Json(response))
// }

#[get("/order/search?<query_params..>")]
pub fn search_orders(query_params: OrdersQueryParams) -> Custom<Json<ApiResponse<Vec<OrderWithItems>>>> {
    let response = read::search_orders(query_params);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[get("/order/user_ordered_product/<user_id>/<product_id>")]
pub fn find_user_ordered_product(user_id:i32, product_id:i32) -> Custom<Json<ApiResponse<()>>>{
    let response = read::find_user_ordered_product(user_id, product_id);
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

