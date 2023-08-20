use models::review_product::*;
use shared::response_models::{ApiResponse};
use infrastructure::establish_connection;
use rocket::serde::json::Json;
use rocket_validation::{ Validated};
use diesel::result::Error;

 
pub fn delete_review_by_id(review_id:i32) -> ApiResponse<()>{
    let connection = &mut establish_connection();
    match repositories::review_product::delete_review_product(connection, review_id){
        Ok(_)=>{},
        Err(Error::NotFound)=>{
            let response = ApiResponse{
                success:false,
                message:"Product review does not exist by specified id".to_string(),
                data: None,
                status_code:404
            };
            return response;
        },
        Err(_)=>{let response = ApiResponse{
            success:false,
            message:"Internal error".to_string(),
            data: None,
            status_code:500
        };
        return response;
        }
    };
    let response = ApiResponse{
        success:true,
        message:"Review of product successful deleted".to_string(),
        data: Some(()),
        status_code:200
    };
    response

    
}