use shared::response_models::{ApiResponse};
use rocket::{get, post, put, delete};
use rocket::serde::{json::Json};
use rocket_validation::{ Validated};
use models::report_orders::*;
use rocket::response::status::Custom;
use rocket::Request;
use reqwest::header::{HeaderMap, AUTHORIZATION};
use rocket::http::Status;
use rocket::request::Outcome;
use rocket::request::{self, FromRequest};
use std::collections::HashMap;
use chrono::NaiveDateTime;
use chrono::NaiveDate;



async fn make_request(token: String,  query_params: ReportQueryParams) -> Result<ApiResponse<Vec<Order>>, reqwest::Error> {
    let start_date = &query_params.start_date;
    let start_date_str = format!(
        "start_date[day]={}&start_date[month]={}&start_date[year]={}",
        start_date.day, start_date.month, start_date.year
    );

    let end_date_str = if let Some(end_date) = &query_params.end_date {
        format!(
            "&end_date[day]={}&end_date[month]={}&end_date[year]={}",
            end_date.day, end_date.month, end_date.year
        )
    } else {
        String::new()
    };

    let request_url = format!(
        "http://127.0.0.1:5000/order/search?{}&order_status=FINISHED",
        start_date_str + &end_date_str
    );

    let mut headers = HeaderMap::new();
    headers.insert(AUTHORIZATION, format!("Bearer {}", token).parse().unwrap());
    let client = reqwest::Client::new();
    let response = client.get(&request_url).headers(headers).send().await;
 
    let orders = match response {
        Ok(response) => {
           
            let orderBaseInf: ApiResponse<Vec<Order>> = response.json().await?;
            println!("{:?}",orderBaseInf);
            
            Ok(orderBaseInf)
        }
        Err(err) => {
            
            Ok(ApiResponse {
                success: false,
                status_code: 500,
                data: None,
                message: "Order service is not available".to_string(),
            })
        }
    };
    println!("123321");
    println!("{:?}",orders);
    orders
    
}


pub async fn get_reports(jwt: Jwt, query_params: ReportQueryParams) -> ApiResponse<Vec<ItemReport>> {
    println!("JWT: {}", jwt.0);
    let orders: Vec<Order> = match make_request(jwt.0.replace("Bearer ", ""), query_params).await{
        Ok(res) => match res.data {
            Some(data) => data,
            None => {
                let response = ApiResponse {
                    success: false,
                    message: "No data available".to_string(),
                    data: None,
                    status_code: 404,
                };
                return response;
            }
        },
        Err(_) => {
            let response = ApiResponse {
                success: false,
                message: "Internal error while fetching orders".to_string(),
                data: None,
                status_code: 500,
            };
            return response;
        }
    };

    let mut reports_map: HashMap<NaiveDate, f64> = HashMap::new();

    for order in orders {
        let date = order.finished_at.date(); 
        let mut order_value = 0.0;

        for item in order.items {
            order_value += item.price * item.quantity as f64; 
        }

        
        let counter = reports_map.entry(date).or_insert(0.0);
        *counter += order_value;
    }


    let mut reports: Vec<ItemReport> = reports_map
        .into_iter()
        .map(|(date, value)| ItemReport { date, value })
        .collect();


    reports.sort_by(|a, b| a.date.cmp(&b.date));

    let response = ApiResponse {
        success: true,
        message: "OK".to_string(),
        data: Some(reports),
        status_code: 200,
    };
    response
}