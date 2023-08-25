extern crate rocket;
extern crate diesel;
use models::order::{ OrderWithItems, OrdersQueryParams, OrderWithLoadedItems, LoadedOrderItem};
use models::product::*;
use shared::response_models::{ApiResponse};
use infrastructure::establish_connection;
use diesel::prelude::*;
use diesel::result::Error;
use rocket::serde::{json::Json, Deserialize, Serialize};
const DEFAULT_PAGE_SIZE: i64 = 10;

async fn make_request(product_id:i32) -> Result<ApiResponse<BasicProductData>, reqwest::Error> {
    let request_url = format!("http://localhost:5000/product/basic/{}", product_id);
    println!("123321");
    let response = reqwest::get(request_url).await;
    println!("123321");
    let orderBaseInf = match response {
        Ok(response) => {
            println!("123321");
            let orderBaseInf: ApiResponse<BasicProductData> = response.json().await?;
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
pub async fn find_order_by_id(order_id: i32) -> ApiResponse<OrderWithLoadedItems> {
    let connection = &mut establish_connection();

    let order = match repositories::order::find_order_by_id(connection, order_id){
        Ok(order) => order,
        Err(Error::NotFound) => {
            return ApiResponse{
                success: false,
                status_code:404,
                message: "Order not found".to_string(),
                data: None
            };
        },
        Err(_) => {
            return ApiResponse{
                success: false,
                status_code:500,
                message: "Internal error".to_string(),
                data: None
            };
        }
    };
    let order_items = match repositories::order_item::find_order_items_by_order_id(connection, order_id){
        Ok(order_items)=>order_items,
        Err(_) =>{
            return ApiResponse{
                success: false,
                status_code:500,
                message: "Internal error".to_string(),
                data: None
            };
        }
    };
    let mut loaded_order_items: Vec<LoadedOrderItem> = Vec::new();

    
        
    for item in &order_items {
        let product_basic :BasicProductData = match make_request(item.product_id).await{
            Ok(res)=>{
                let product_data = match res.data {
                    Some(data) => data,
                    None => {
                        return ApiResponse {
                            success: false,
                            status_code: 404,
                            message: "Product data not found".to_string(),
                            data: None,
                        };
                    }
                };
                product_data
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
        loaded_order_items.push(LoadedOrderItem {
            id: item.id,
            quantity: item.quantity,
            product_id: item.product_id,
            price: item.price,
            name: product_basic.name,
            image: product_basic.image
        });
    }

    let order_with_items = OrderWithLoadedItems{
                            id:order.id,
                            user_id: order.user_id,
                            address:order.address,
                            note: order.note,
                            order_status: order.order_status,
                            deliverer_id: order.deliverer_id,
                            delivery:order.delivery,
                            created_at: order.created_at,
                            finished_at: order.finished_at,
                            items: loaded_order_items
    };

    return ApiResponse{
                        success: true,
                        status_code:200,
                        data:Some(order_with_items),
                        message:"OK".to_string()
                    };

}

pub fn find_orders_by_user_id(user_id:i32) -> ApiResponse<Vec<OrderWithItems>>{
    let connection = &mut establish_connection();
    let result = match connection.transaction(|connection| {
        let orders = repositories::order::find_order_by_user_id(connection, user_id)?;
        let mut orders_with_items: Vec<OrderWithItems> = Vec::new();
        for order in orders{
            let order_items = repositories::order_item::find_order_items_by_order_id(connection, order.id)?;
            let order_with_items = OrderWithItems {
                id: order.id,
                user_id: order.user_id,
                address: order.address,
                note: order.note,
                order_status: order.order_status,
                deliverer_id: order.deliverer_id,
                delivery: order.delivery,
                created_at: order.created_at,
                finished_at: order.finished_at,
                items: order_items,
            };

            orders_with_items.push(order_with_items);
        }
        
        diesel::result::QueryResult::Ok(orders_with_items)
    }) {
        
        Ok(orders_with_items) => orders_with_items,
        Err(_) => {
            return ApiResponse{
                success: false,
                status_code:500,
                message: "Internal error".to_string(),
                data: None
            };
        }

    };
    
    return ApiResponse{
                        success: true,
                        status_code:200,
                        data:Some(result),
                        message:"OK".to_string()
                    };
}

pub fn search_orders(query_params: OrdersQueryParams) -> ApiResponse<Vec<OrderWithItems>>{
    let connection = &mut establish_connection();
    let query_user_id = query_params.user_id;
    let query_delivery = query_params.delivery;
    let query_deliverer_id = query_params.deliverer_id;
    let query_order_status = query_params.order_status;
    let query_start_date = query_params.start_date;
    let query_end_date = query_params.end_date;

    let orders_with_items = match connection.transaction(|connection| {
        let matched_orders = repositories::order::search_orders(connection, query_user_id, query_delivery, query_deliverer_id,
            query_order_status, query_start_date, query_end_date)?;
            // {
            //     Ok(orders) => orders,
            //     Err(_) => {
            //         return ApiResponse {
            //             success: false,
            //             message: "Internal error".to_string(),
            //             status_code: 500,
            //             data: None,
            //         };
            //     }
            // };

        // Load order items for each matched order
        let mut orders_with_items: Vec<OrderWithItems> = Vec::new();

        for order in matched_orders {
            let items_for_order =  repositories::order_item::find_order_items_by_order_id(connection, order.id)?;
            // {
            //     Ok(items) => items,
            //     Err(_) => {
            //         return ApiResponse {
            //             success: false,
            //             message: "Error while loading order items".to_string(),
            //             status_code: 500,
            //             data: None,
            //         };
            //     }
            // };
    
            let order_with_items = OrderWithItems {
                id: order.id,
                user_id: order.user_id,
                address: order.address,
                note: order.note,
                order_status: order.order_status,
                deliverer_id: order.deliverer_id,
                delivery: order.delivery,
                created_at: order.created_at,
                finished_at: order.finished_at,
                items: items_for_order,
            };
    
            orders_with_items.push(order_with_items);
        };

        diesel::result::QueryResult::Ok(orders_with_items)
    }){
        Ok(orders_with_items) => orders_with_items,
        Err(_) =>{
            return ApiResponse {
                success: false,
                message: "Internal error".to_string(),
                status_code: 500,
                data: None,
            };
        }
    };
 
     let response= ApiResponse {
         success: true,
         status_code: 200,
         data: Some(orders_with_items),
         message: "OK".to_string(),
     };
 
     response

}


pub fn find_orders_by_deliverer_id(deliverer_id:i32) -> ApiResponse<Vec<OrderWithItems>>{
    let connection = &mut establish_connection();
    let result = match connection.transaction(|connection| {
        let orders = repositories::order::find_order_by_deliverer_id(connection, deliverer_id)?;
        let mut orders_with_items: Vec<OrderWithItems> = Vec::new();
        for order in orders{
            let order_items = repositories::order_item::find_order_items_by_order_id(connection, order.id)?;
            let order_with_items = OrderWithItems {
                id: order.id,
                user_id: order.user_id,
                address: order.address,
                note: order.note,
                order_status: order.order_status,
                deliverer_id: order.deliverer_id,
                delivery: order.delivery,
                created_at: order.created_at,
                finished_at: order.finished_at,
                items: order_items,
            };

            orders_with_items.push(order_with_items);
        }
        
        diesel::result::QueryResult::Ok(orders_with_items)
    }) {
        
        Ok(orders_with_items) => orders_with_items,
        Err(_) => {
            return ApiResponse{
                success: false,
                status_code:500,
                message: "Internal error".to_string(),
                data: None
            };
        }

    };
    
    return ApiResponse{
                        success: true,
                        status_code:200,
                        data:Some(result),
                        message:"OK".to_string()
                    };
}
