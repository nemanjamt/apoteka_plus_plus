
use models::order::{Order,  OrderWithItems, ChangeOrder,   OrderChangeRequest};
use shared::response_models::{ApiResponse};
use infrastructure::establish_connection;
use rocket::serde::json::Json;
use chrono::{ Local};
use rocket_validation::{ Validated};
use diesel::connection::Connection;
use diesel::result::Error;

pub fn change_order(order_id: i32, request:Validated<Json<OrderChangeRequest>>) -> ApiResponse<OrderWithItems>{
    
    
    //provjera da li postoji user sa tim id-em i da li postoji deliverer sa tim id-em
    //proci kroz sve item-e i provjeriti da li referenciju postojeci proizvod!
    let order_change_request = request.into_inner().into_inner();
    let update_order = ChangeOrder {
        address: order_change_request.address,
        delivery: order_change_request.delivery,
        note: order_change_request.note
    };
    let connection = &mut establish_connection();
    let result = match connection.transaction(|connection| {
            let changed_order  = repositories::order::change_order(connection, order_id, update_order)?;

            let items = repositories::order_item::find_order_items_by_order_id(connection, order_id)?;

            let result = OrderWithItems {
                    id: changed_order.id,
                    user_id: changed_order.user_id,
                    address: changed_order.address,
                    order_status: changed_order.order_status,
                    deliverer_id: changed_order.deliverer_id,
                    delivery: changed_order.delivery,
                    created_at: changed_order.created_at,
                    finished_at: changed_order.finished_at,
                    note: changed_order.note,
                    items: items,
                };
            diesel::result::QueryResult::Ok(result) }
        )
            {
                Ok(res) => res,
                Err(Error::NotFound) => {
                    let api_response = ApiResponse {
                    success: false,
                    status_code: 404,
                    data: None,
                    message: "Order not found".to_string(),
                };

                return api_response;
            },
                Err(_) => {
                        let api_response = ApiResponse {
                        success: false,
                        status_code: 500,
                        data: None,
                        message: "Internal error".to_string(),
                    };

                    return api_response;
                }
            };
    
   

    let response = ApiResponse{
        success: true,
        status_code: 200,
        data: Some(result),
        message: "Order successful changed".to_string()
    };

    response
}


pub fn change_status_order(order_id: i32, order_status: String)->ApiResponse<Order>{

    let connection = &mut establish_connection();
    let result = match connection.transaction(|connection| {
        let borrowed =  order_status.to_string();
        let mut changed_order = repositories::order::change_order_status(connection,order_id,order_status)?; 
        if borrowed == "FINISHED"{
            changed_order = repositories::order::set_finish_time(connection, order_id, Local::now().naive_local())?;
        }
        Ok(changed_order)
    }){
        Ok(order) => order,
        Err(Error::NotFound) =>{
            let api_response = ApiResponse {
                success: false,
                status_code: 404,
                data: None,
                message: "Order not found".to_string(),
            };

            return api_response;
        },
        Err(_)=>{
            let api_response = ApiResponse {
                    success: false,
                    status_code: 500,
                    data: None,
                    message: "Internal error".to_string(),
                };

            return api_response;
        }
    };
    let response = ApiResponse{
        success: true,
        status_code: 200,
        data: Some(result),
        message: "Order successful changed".to_string()
    };

    response
    
}


