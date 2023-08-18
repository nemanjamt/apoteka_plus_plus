extern crate rocket;
extern crate diesel;
use models::product::*;
use shared::response_models::{ApiResponse};
// use diesel::prelude::*;
use diesel::result::Error;
// use rocket::serde::{json::Json, Deserialize, Serialize};
// use rocket::form::{Form};
// use rocket::response::Debug;
// use std::env;
// use repositories::*;



pub fn delete_product(product_id: i32) -> ApiResponse<Product> {
 
    match repositories::product::delete_product(product_id)
    {
        Ok(updated_product) => {
            
            let api_response = ApiResponse {
                success: true,
                status_code: 200, 
                data: Some(updated_product),
                message: "Product successful deleted".to_string()
            };
        
            api_response
        },
        Err(Error::NotFound) => {
            let api_response = ApiResponse {
                success: false,
                status_code: 404, 
                data: None,
                message: "Product with specified id does not exists".to_string()
            };
            api_response
        },
        Err(_) => {
            let api_response = ApiResponse {
                success: false,
                status_code: 500, 
                data: None,
                message: "Error deleting product".to_string()
            };
        
            api_response
        }
    }
}