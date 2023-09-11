use models::review_deliverer::*;
use models::shared::*;
use shared::response_models::{ApiResponse};
use infrastructure::establish_connection;
use rocket::serde::json::Json;
use rocket_validation::{ Validated};
use diesel::result::Error;


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
//add users data
pub async fn find_all_deliverers_reviews(deliverer_id:i32) -> ApiResponse<Vec<ReviewDelivererDetailed>>{
    let connection = &mut establish_connection();
    let reviews_deliverer = match repositories::review_deliverer::find_all_deliverers_reviews(connection, deliverer_id){
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

    let mut reviews_deliverer_with_user: Vec<ReviewDelivererDetailed> = Vec::new();
    for review in &reviews_deliverer{
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


        let review_with_user = ReviewDelivererDetailed  {
            id: review.id,
            comment: review.comment.to_string(),
            user_id:review.user_id,
            mark:review.mark,
            order_id:review.order_id,
            deliverer_id: review.deliverer_id,
            reported:review.reported,
            first_name: user_basic.first_name.to_string(),
            last_name: user_basic.last_name.to_string()

        };
        reviews_deliverer_with_user.push(review_with_user);
    }

    let response = ApiResponse{
        success:true,
        status_code:200,
        message:"OK".to_string(),
        data: Some(reviews_deliverer_with_user)
    };
    response
}


pub fn find_review_by_deliverer_order(deliverer_id:i32,  order_id:i32) -> ApiResponse<ReviewDeliverer>{
    let connection = &mut establish_connection();
    
    let result = match repositories::review_deliverer::find_review_by_deliverer_order(connection, deliverer_id,  order_id){
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

//add users data
pub async fn get_reported_reviews_deliverer()->ApiResponse<Vec<ReviewDelivererDetailed>>{
    let connection = &mut establish_connection();
    let reviews_deliverer = match repositories::review_deliverer::get_reported_review_deliverer(connection){
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

    let mut reviews_deliverer_with_user: Vec<ReviewDelivererDetailed> = Vec::new();
    for review in &reviews_deliverer{
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


        let review_with_user = ReviewDelivererDetailed  {
            id: review.id,
            comment: review.comment.to_string(),
            user_id:review.user_id,
            mark:review.mark,
            order_id:review.order_id,
            deliverer_id: review.deliverer_id,
            reported:review.reported,
            first_name: user_basic.first_name.to_string(),
            last_name: user_basic.last_name.to_string()

        };
        reviews_deliverer_with_user.push(review_with_user);
    }
    let response = ApiResponse{
        success:true,
        status_code:200,
        message:"OK".to_string(),
        data: Some(reviews_deliverer_with_user)
    };
    response
}