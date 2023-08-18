use crate::response_models::ApiResponse;
use rocket::serde::{json::Json };
use rocket::response::status::Custom;
use rocket_validation::CachedValidationErrors;
use rocket::{Request, catch, http::Status};

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
pub fn unprocessable_entity(req: &Request) -> Custom<Json<ApiResponse<()>>> {
    let validation_errors = req.local_cache(|| CachedValidationErrors(None)).0.as_ref();

    let mut message = "Something goes wrong!".to_string();
 
    if validation_errors.is_some() {
        message.clear();
        
        let erros = validation_errors.unwrap().field_errors();
        
        for (_,val) in erros.iter() {
            for error in val.iter() {
                message.push_str(error.message.as_ref().unwrap());
            }
        }
    }

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