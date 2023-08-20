use models::review_deliverer::*;
use shared::response_models::{ApiResponse};
use infrastructure::establish_connection;
use rocket::serde::json::Json;
use rocket_validation::{ Validated};
use diesel::result::Error;


pub fn create_review_deliverer(new_review_deliverer_request:Validated<Json<NewReviewDeliverer>>) -> ApiResponse<ReviewDeliverer>{
    let new_review_deliverer = new_review_deliverer_request.into_inner().into_inner();
    let connection = &mut establish_connection();
    // match repositories::review_product::get_review_product_by_user_id_and_product_id(connection, new_review_deliverer.user_id, new_review_product.deliverer_id){
    //     Ok(_)=>{
    //         let response = ApiResponse{
    //             success:false,
    //             message:"Review for product already exist by same user".to_string(),
    //             data: None,
    //             status_code:400
    //         };
    //         return response;
    //     },
    //     Err(Error::NotFound)=>{},
    //     Err(_)=>{
    //         let response = ApiResponse{
    //             success:false,
    //             message:"Internal error".to_string(),
    //             data: None,
    //             status_code:500
    //         };
    //         return response;
    //     }
    // };
    let result = match repositories::review_deliverer::create_review_deliverer(connection, new_review_deliverer){
        Ok(review_deliverer) => review_deliverer,
        Err(_) => {
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
        message:"Review of deliverer successful created".to_string(),
        data: Some(result),
        status_code:201
    };
    response
}