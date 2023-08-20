use models::review_deliverer::*;
use shared::response_models::{ApiResponse};
use infrastructure::establish_connection;
use rocket::serde::json::Json;
use rocket_validation::{ Validated};
use diesel::result::Error;

pub fn find_review_deliverer_by_id(review_id:i32) -> ApiResponse<ReviewDeliverer>{
    let connection = &mut establish_connection();
    let result = match repositories::review_deliverer::get_review_deliverer_by_id(connection, review_id){
        Ok(review_deliverer)=>review_deliverer,
        Err(Error::NotFound)=>{
            let response = ApiResponse{
                success:false,
                status_code:404,
                message:"Deliverer review with specified id does not exist".to_string(),
                data: None
            };
            return response;
        },
        Err(_)=>{
            let response = ApiResponse{
                success:false,
                status_code:500,
                message:"Internal error".to_string(),
                data: None
            };
            return response;
        }
    };

    let response = ApiResponse{
        success:true,
        status_code:200,
        message:"OK".to_string(),
        data: Some(result)
    };
    return response;
}

pub fn find_all_deliverers_reviews(deliverer_id:i32) -> ApiResponse<Vec<ReviewDeliverer>>{
    let connection = &mut establish_connection();
    let result = match repositories::review_deliverer::find_all_deliverers_reviews(connection, deliverer_id){
        Ok(reviews_deliverer)=>reviews_deliverer,
        Err(_)=>{
            let response = ApiResponse{
                success:false,
                status_code:500,
                message:"Internal error".to_string(),
                data: None
            };
            return response;
        }
    };

    let response = ApiResponse{
        success:true,
        status_code:200,
        message:"OK".to_string(),
        data: Some(result)
    };
    response
}


pub fn find_review_by_deliverer_and_user(deliverer_id:i32, user_id:i32) -> ApiResponse<ReviewDeliverer>{
    let connection = &mut establish_connection();
    let result = match repositories::review_deliverer::find_review_by_deliverer_and_user(connection, deliverer_id, user_id){
        Ok(review)=>review,
        Err(Error::NotFound)=>{
            let response = ApiResponse{
                success:false,
                status_code:404,
                message:"Deliverer review does not exist that is created by this user".to_string(),
                data: None
            };
            return response;
        },
        Err(_)=>{
            let response = ApiResponse{
                success:false,
                status_code:500,
                message:"Internal error".to_string(),
                data: None
            };
            return response;
        }
    };
    let response = ApiResponse{
        success:true,
        status_code:200,
        message:"OK".to_string(),
        data: Some(result)
    };
    response
}


pub fn get_reported_reviews_deliverer()->ApiResponse<Vec<ReviewDeliverer>>{
    let connection = &mut establish_connection();
    let result = match repositories::review_deliverer::get_reported_review_deliverer(connection){
        Ok(reviews)=>reviews,
        Err(_)=>{
            let response = ApiResponse{
                success:false,
                status_code:500,
                message:"Internal error".to_string(),
                data: None
            };
            return response;
        }

    };
    let response = ApiResponse{
        success:true,
        status_code:200,
        message:"OK".to_string(),
        data: Some(result)
    };
    response
}