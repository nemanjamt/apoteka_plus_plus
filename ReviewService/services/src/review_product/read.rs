use models::review_product::*;
use models::shared::*;
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

async fn make_request(user_id:i32) -> Result<ApiResponse<UserBasicInfo>, reqwest::Error> {
    let request_url = format!("http://127.0.0.1:5000/user/basic?id={}", user_id);
    println!("123321");
    let response = reqwest::get(request_url).await;
    println!("123321");
    let orderBaseInf = match response {
        Ok(response) => {
            println!("123321");
            let orderBaseInf: ApiResponse<UserBasicInfo> = response.json().await?;
            println!("123321");
            Ok(orderBaseInf)
        }
        Err(err) => {
            println!("Uspjesno obradjena greska!");
            eprintln!("Error sending request: {:?}", err);
            Ok(ApiResponse {
                success: false,
                status_code: 500,
                data: None,
                message: "Order service is not available".to_string(),
            })
        }
    };
    println!("123321");
    println!("{:?}",orderBaseInf);
    orderBaseInf
    
}

pub async fn find_reviews_product_by_product_id(product_id:i32) -> ApiResponse<Vec<ReviewProductDetailed>>{
    let connection = &mut establish_connection();
    let reviews_product = match repositories::review_product::get_reviews_product_by_product_id(connection, product_id){
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
    let mut reviews_product_with_user: Vec<ReviewProductDetailed> = Vec::new();
    for review in &reviews_product{
        let user_basic : UserBasicInfo = match make_request(review.user_id).await{
            Ok(res)=>{
                let user_data = match res.data {
                    Some(data) => data,
                    None => {
                        return ApiResponse {
                            success: false,
                            status_code: 404,
                            message: "User data not found".to_string(),
                            data: None,
                        };
                    }
                };
                user_data
            },
            Err(err)=>{
                return ApiResponse{
                    success: false,
                    status_code:500,
                    message: "Internal error".to_string(),
                    data: None
                };
            }
        };
        let review_with_user = ReviewProductDetailed  {
            id: review.id,
            comment: review.comment.to_string(),
            user_id:review.user_id,
            mark:review.mark,
            reported:review.reported,
            product_id:review.product_id,
            first_name: user_basic.first_name.to_string(),
            last_name: user_basic.last_name.to_string()

        };
        reviews_product_with_user.push(review_with_user);
    }

    let response = ApiResponse{
        success:true,
        status_code:200,
        message:"OK".to_string(),
        data: Some(reviews_product_with_user)
    };
    response
}

pub fn find_reviews_product_by_user_and_product_id(user_id:i32, product_id:i32) -> ApiResponse<ReviewProduct>{
    let connection = &mut establish_connection();
    let res = match repositories::review_product::get_review_product_by_user_id_and_product_id(connection, user_id, product_id){
        Ok(review)=>review,
        Err(_) => {
            return ApiResponse{
                success:false,
                status_code:404,
                message:"Review of product not exist by provided user".to_string(),
                data: None
            };
        }
    };
    return ApiResponse{
        success:true,
        status_code:200,
        message:"OK".to_string(),
        data: Some(res)
    };
}

pub async fn get_reported_reviews_product()->ApiResponse<Vec<ReviewProductDetailed>>{
    let connection = &mut establish_connection();
    let reviews_product = match repositories::review_product::get_reported_reviews_product(connection){
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

    let mut reviews_product_with_user: Vec<ReviewProductDetailed> = Vec::new();
    for review in &reviews_product{
        let user_basic : UserBasicInfo = match make_request(review.user_id).await{
            Ok(res)=>{
                let user_data = match res.data {
                    Some(data) => data,
                    None => {
                        return ApiResponse {
                            success: false,
                            status_code: 404,
                            message: "User data not found".to_string(),
                            data: None,
                        };
                    }
                };
                user_data
            },
            Err(err)=>{
                return ApiResponse{
                    success: false,
                    status_code:500,
                    message: "Internal error".to_string(),
                    data: None
                };
            }
        };
        let review_with_user = ReviewProductDetailed  {
            id: review.id,
            comment: review.comment.to_string(),
            user_id:review.user_id,
            mark:review.mark,
            reported:review.reported,
            product_id:review.product_id,
            first_name: user_basic.first_name.to_string(),
            last_name: user_basic.last_name.to_string()

        };
        reviews_product_with_user.push(review_with_user);
    }
    let response = ApiResponse{
        success:true,
        status_code:200,
        message:"OK".to_string(),
        data: Some(reviews_product_with_user)
    };
    response
}