extern crate rocket;
extern crate diesel;
use models::product::*;
use shared::response_models::{ApiResponse};
use diesel::prelude::*;
use diesel::result::Error;
use rocket::serde::{json::Json, Deserialize, Serialize};
use rocket::form::{Form};
use rocket::response::Debug;
use std::env;
use repositories::*;
use infrastructure::*;
const DEFAULT_PAGE_SIZE: i64 = 10;



pub fn find_product_by_id(product_id: i32) -> ApiResponse<Product> {
    let product = match repositories::product::find_product_by_id(product_id){
        Ok(product) => product,
        Err(Error::NotFound) =>{
            let response = ApiResponse{
                success: false,
                message: "Product with specified id does not exists".to_string(),
                data: None,
                status_code: 404
            };
            return response;
        },
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
        message: "OK".to_string(),
        data: Some(product),
        status_code: 200
    };
    response
}

pub fn find_basic_product_data_by_id(product_id: i32) -> ApiResponse<BasicProductData> {
    let product = match repositories::product::find_basic_product_data_by_id(product_id){
        Ok(product) => product,
        Err(Error::NotFound) =>{
            let response = ApiResponse{
                success: false,
                message: "Product with specified id does not exists".to_string(),
                data: None,
                status_code: 404
            };
            return response;
        },
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
        message: "OK".to_string(),
        data: Some(product),
        status_code: 200
    };
    response
}

pub fn search_products(query_params: ProductQueryParams)-> ApiResponse<Vec<Product>>{

    let product_name = query_params.product_name;
    let min_price = query_params.min_price;
    let max_price = query_params.max_price;
    let is_available = query_params.is_available;
    let sort_by = query_params.sort_by;
    let order = query_params.order;
    let page = query_params.page;
    
    println!("prrrrrr");
    println!("{:?}",product_name);
    
    
    match repositories::product::search_product(product_name, min_price, max_price, is_available, sort_by,
        order, page, DEFAULT_PAGE_SIZE) {
        Ok(matched_products) => {
            return ApiResponse {
                success: true,
                status_code: 200,
                data: Some(matched_products),
                message: "OK".to_string(),
        };
    },
        Err(e) => {
            return ApiResponse {
                success: false,
                status_code: 500,
                data: None,
                message: "Failed to fetch products".to_string(),
            };
        }
    };

}