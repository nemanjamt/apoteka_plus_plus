
extern crate rocket;
extern crate diesel;
use models::product::*;
use shared::response_models::{ApiResponse};
// use diesel::prelude::*;
use diesel::result::Error;
use rocket::serde::{json::Json};
// use rocket::form::{Form};
// use rocket::response::Debug;
// use std::env;
// use repositories::*;
use rocket_validation::{Validated};
use std::fs::File;
use std::io::{self, Write};
use std::path::PathBuf;

pub fn change_product(product_id: i32, request_change: Validated<Json<UpdatedProductRequest>>) -> ApiResponse<Product> {

    
    let request_product = request_change.into_inner().into_inner(); 
    let request_product_change = UpdatedProduct{
        name: request_product.name,
        description: request_product.description,
        price: request_product.price,
        available: request_product.available
    };
    if request_product.image != "" {
        let base64_string = request_product.image; 
        let decoded_bytes = match base64::decode(base64_string){
            Ok(bytes)=> bytes,
            Err(_)=>{
                let response = ApiResponse{
                    success: false,
                    message: "Internal error".to_string(),
                    data: None,
                    status_code: 500
                };
                return response;
            }
        };

        // Definišite putanju na kojoj želite da sačuvate sliku
        let output_path = format!("../STORAGE/image{}.jpg", product_id);

        let mut output_file = match File::create(output_path){
            Ok(bytes)=> bytes,
            Err(_)=>{
                let response = ApiResponse{
                    success: false,
                    message: "Internal error".to_string(),
                    data: None,
                    status_code: 500
                };
                return response;
            }
        };
        let changed_product = match output_file.write_all(&decoded_bytes){
            Ok(_)=> {
                match repositories::product::change_product_image_name(product_id, format!("image{}.jpg", product_id)){
                    Ok(product)=>product,
                    Err(_)=>{
                        let response = ApiResponse{
                            success: false,
                            message: "Internal error".to_string(),
                            data: None,
                            status_code: 500
                        };
                        return response;
                    }
                }
            },
            Err(_)=>{
                let response = ApiResponse{
                    success: false,
                    message: "Internal error".to_string(),
                    data: None,
                    status_code: 500
                };
                return response;
            }
        };

    }
    match repositories::product::change_product(product_id, request_product_change)
    {
        Ok(updated_product) => {
            
            let api_response = ApiResponse {
                success: true,
                status_code: 200, 
                data: Some(updated_product),
                message: "Product successful update".to_string()
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
                message: "Error updating product".to_string()
            };
        
            api_response
        }
    }
    
    
}