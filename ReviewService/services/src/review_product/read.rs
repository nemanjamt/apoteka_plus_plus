use models::review_product::*;
use shared::response_models::{ApiResponse};
use infrastructure::establish_connection;
use rocket::serde::json::Json;
use rocket_validation::{ Validated};
use diesel::result::Error;

pub fn find_review_product_by_id(review_id:i32) -> ApiResponse<ReviewProduct>{
    let connection = &mut establish_connection();
    let result = match repositories::review_product::get_review_product_by_id(connection, review_id){
        Ok(review_product)=>review_product,
        Err(Error::NotFound)=>{
            let response = ApiResponse{
                success:false,
                status_code:404,
                message:"Product review with specified id does not exist".to_string(),
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

pub fn find_reviews_product_by_product_id(product_id:i32) -> ApiResponse<Vec<ReviewProduct>>{
    let connection = &mut establish_connection();
    let result = match repositories::review_product::get_reviews_product_by_product_id(connection, product_id){
        Ok(reviews_product)=>reviews_product,
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

pub fn get_reported_reviews_product()->ApiResponse<Vec<ReviewProduct>>{
    let connection = &mut establish_connection();
    let result = match repositories::review_product::get_reported_reviews_product(connection){
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