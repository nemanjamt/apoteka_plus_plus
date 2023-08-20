// use services::order::*;
// use models::order::*;
use shared::response_models::{ApiResponse};
use rocket::{get, post, put, delete};
use rocket::serde::{json::Json};
use rocket_validation::{ Validated};
use services::review_product::*;
use rocket::response::status::Custom;
use models::review_product::*;
// #[get("/review/product/<review_id>")]
// pub fn find_review_product(review_id: i32) -> Custom<J
#[post("/review_product", format="application/json", data="<new_review_product_request>")]
pub fn create_review_product(new_review_product_request: Validated<Json<NewReviewProduct>>) -> Custom<Json<ApiResponse<ReviewProduct>>>{
    let response = create::create_review_product(new_review_product_request);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[get("/review_product/<review_id>")]
pub fn get_review_product_by_id(review_id: i32) -> Custom<Json<ApiResponse<ReviewProduct>>>{
    let response = read::find_review_product_by_id(review_id);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[get("/reviews_product/<product_id>")]
pub fn get_reviews_product_by_product_id(product_id: i32) -> Custom<Json<ApiResponse<Vec<ReviewProduct>>>>{
    let response = read::find_reviews_product_by_product_id(product_id);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[put("/review_product/<review_id>", format="application/json", data="<change_request>")]
pub fn change_review_product(review_id:i32, change_request: Validated<Json<ChangeReviewProduct>>)-> Custom<Json<ApiResponse<ReviewProduct>>>{
    let response = change::change_review_product(review_id, change_request);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[delete("/reviews_product/<review_id>")]
pub fn delete_reviews_product(review_id: i32) -> Custom<Json<ApiResponse<()>>>{
    let response = delete::delete_review_by_id(review_id);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[put("/review_product/report/<review_id>")]
pub fn report_review_product(review_id:i32)-> Custom<Json<ApiResponse<()>>>{
    let response = change::report_review_product(review_id);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[get("/review_product/reported")]
pub fn get_reported_reviews() -> Custom<Json<ApiResponse<Vec<ReviewProduct>>>>{
    let response = read::get_reported_reviews_product();
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

