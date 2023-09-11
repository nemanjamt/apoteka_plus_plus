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
use std::fs::File;
use std::io::{self, Write};
use std::path::PathBuf;

pub fn create_product(product_request: Validated<Json<NewProductRequest>>) -> ApiResponse<Product>{
    let new_request = product_request.into_inner().into_inner();
    let new_product_request = NewProduct{
        name: new_request.name,
        description: new_request.description,
        price: new_request.price,
    };
    let mut new_product = match repositories::product::create_product(new_product_request){
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

    if new_request.image != ""{
        let base64_string = new_request.image; 
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

        let output_path = format!("../STORAGE/image{}.jpg", new_product.id);

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
        new_product = match output_file.write_all(&decoded_bytes){
            Ok(_)=> {
                match repositories::product::change_product_image_name(new_product.id, format!("image{}.jpg", new_product.id)){
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
    let response = ApiResponse{
        success: true,
        message: "Product successful created".to_string(),
        data: Some(new_product),
        status_code: 201
    };
    response

}