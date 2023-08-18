
use rocket::{get, post, put, delete};
use rocket::serde::{json::Json};
use models::product::*;
use shared::response_models::*;
use rocket_validation::{Validated};
use rocket::response::status::Custom;

#[get("/product/<product_id>")]
pub fn find_product_by_id(product_id: i32) -> Custom<Json<ApiResponse<Product>>> {
    let response = services::product::read::find_product_by_id(product_id);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[get("/product/basic/<product_id>")]
pub fn find_basic_product_data_by_id(product_id: i32) -> Custom<Json<ApiResponse<BasicProductData>>> {
    let response = services::product::read::find_basic_product_data_by_id(product_id);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[get("/product/search?<query_params..>")]
pub fn search_products(query_params: ProductQueryParams) ->Custom<Json<ApiResponse<Vec<Product>>>> {
    let response = services::product::read::search_products(query_params);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[post("/product", format="application/json" , data="<product_request>")]
pub fn create_product(product_request: Validated<Json<NewProduct>>) -> Custom<Json<ApiResponse<Product>>>{
    let response = services::product::create::create_product(product_request);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[put("/product/<product_id>", format="json", data="<request_change>")]
pub fn change_product(product_id: i32, request_change: Validated<Json<UpdatedProduct>>) -> Custom<Json<ApiResponse<Product>>> {
    let response = services::product::change::change_product(product_id, request_change);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[delete("/product/<product_id>")]
pub fn delete_product(product_id: i32) -> Custom<Json<ApiResponse<Product>>> {
    let response = services::product::delete::delete_product(product_id);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

