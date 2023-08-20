use crate::response_models::ApiResponse;
use rocket::serde::{json::Json };
use rocket::response::status::Custom;
use rocket::{ catch};

#[catch(500)]
pub fn internal_error() -> Custom<Json<ApiResponse<()>>> {
    let response = ApiResponse{
        status_code:500,
        message:"Internal error".to_string(),
        success:false,
        data: Some(())
    };
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}


#[catch(422)]
pub fn unprocessable_entity() -> Custom<Json<ApiResponse<()>>> {

    let  message = "Something goes wrong!".to_string();

    let response = ApiResponse{
        status_code:422,
        message:message,
        success:false,
        data: Some(())
    };
    Custom(rocket::http::Status::new(response.status_code), Json(response))

}

#[catch(400)]
pub fn bad_request() -> Custom<Json<ApiResponse<()>>> {
    let response = ApiResponse{
        status_code:400,
        message:"Bad request".to_string(),
        success:false,
        data: Some(())
    };
    Custom(rocket::http::Status::new(response.status_code), Json(response))

}