use models::review_deliverer::*;
use shared::response_models::{ApiResponse};
use infrastructure::establish_connection;
use rocket::serde::json::Json;
use rocket_validation::{ Validated};
use diesel::result::Error;


pub fn change_review_deliverer(review_id:i32, change_request:Validated<Json<ChangeReviewDeliverer>>)->ApiResponse<ReviewDeliverer>{
    let connection = &mut establish_connection();
    let change_review_deliverer = change_request.into_inner().into_inner();
    let result = match repositories::review_deliverer::change_review_deliverer(connection, review_id, change_review_deliverer){
        Ok(review_deliverer) => review_deliverer,
        Err(Error::NotFound)=>{
            let response = ApiResponse{
                success:false,
                message:"Review deliverer with specified id does not exist.".to_string(),
                data: None,
                status_code:404
            };
            return response;
        },
        Err(_)=>{
            let response = ApiResponse{
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
        message:"Review of deliverer successful changed".to_string(),
        data: Some(result),
        status_code:200
    };
    response
}

pub fn report_review_deliverer(review_id:i32) ->ApiResponse<()>{
    let connection = &mut establish_connection();
    match repositories::review_deliverer::report_review_deliverer(connection, review_id){
        Ok(_)=>{},
        Err(Error::NotFound)=>{
            let response = ApiResponse{
                success:false,
                message:"Review of deliverer with specified id does not exist.".to_string(),
                data: None,
                status_code:404
            };
            return response;
        },
        Err(_)=>{
            let response = ApiResponse{
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
        message:"Review of deliverer successful reported".to_string(),
        data: Some(()),
        status_code:200
    };
    response
}