use shared::response_models::{ApiResponse};
use rocket::{get, post, put, delete};
use rocket::serde::{json::Json};
use rocket_validation::{ Validated};
use services::review_deliverer::*;
use rocket::response::status::Custom;
use models::review_deliverer::*;




#[post("/review_deliverer", format="application/json", data="<new_review_deliverer_request>")]
pub fn create_review_deliverer(new_review_deliverer_request: Validated<Json<NewReviewDeliverer>>) -> Custom<Json<ApiResponse<ReviewDeliverer>>>{
    let response = create::create_review_deliverer(new_review_deliverer_request);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[get("/review_deliverer/<review_id>")]
pub fn get_review_deliverer_by_id(review_id: i32) -> Custom<Json<ApiResponse<ReviewDeliverer>>>{
    let response = read::find_review_deliverer_by_id(review_id);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[get("/reviews_deliverer/<deliverer_id>")]
pub fn get_all_deliverers_reviews(deliverer_id: i32) -> Custom<Json<ApiResponse<Vec<ReviewDeliverer>>>>{
    let response = read::find_all_deliverers_reviews(deliverer_id);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[get("/review_deliverer/<deliverer_id>/<user_id>")]
pub fn get_review_deliverer_by_deliverer_and_user(deliverer_id: i32, user_id:i32) -> Custom<Json<ApiResponse<ReviewDeliverer>>>{
    let response = read::find_review_by_deliverer_and_user(deliverer_id, user_id);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[put("/review_deliverer/<review_id>", format="application/json", data="<change_request>")]
pub fn change_review_deliverer(review_id:i32, change_request: Validated<Json<ChangeReviewDeliverer>>)-> Custom<Json<ApiResponse<ReviewDeliverer>>>{
    let response = change::change_review_deliverer(review_id, change_request);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[put("/review_deliverer/report/<review_id>")]
pub fn report_review_deliverer(review_id:i32)-> Custom<Json<ApiResponse<()>>>{
    let response = change::report_review_deliverer(review_id);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[delete("/review_deliverer/<review_id>")]
pub fn delete_reviews_deliverer(review_id: i32) -> Custom<Json<ApiResponse<()>>>{
    let response = delete::delete_review_by_id(review_id);
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}

#[get("/review_deliverer/reported")]
pub fn get_reported_reviews() -> Custom<Json<ApiResponse<Vec<ReviewDeliverer>>>>{
    let response = read::get_reported_reviews_deliverer();
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}