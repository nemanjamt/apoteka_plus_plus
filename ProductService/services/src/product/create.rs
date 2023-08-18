extern crate rocket;
extern crate diesel;
use models::product::*;
use shared::response_models::{ApiResponse};
// use diesel::prelude::*;
// use diesel::result::Error;
use rocket::serde::{json::Json};
// use rocket::form::{Form};
// use rocket::response::Debug;
// use std::env;
// use repositories::*;
use rocket_validation::{Validated};

pub fn create_product(product_request: Validated<Json<NewProduct>>) -> ApiResponse<Product>{
    let new_product_request = product_request.into_inner().into_inner();
    let new_product = match repositories::product::create_product(new_product_request){
        Ok(product) => product,
        Err(_) => {
            let response = ApiResponse{
                success: false,
                message: "Internal error".to_string(),
                data: None,
                status_code: 500
            };
            return response;
        }
    };
    let response = ApiResponse{
        success: true,
        message: "Product successful created".to_string(),
        data: Some(new_product),
        status_code: 201
    };
    response

}