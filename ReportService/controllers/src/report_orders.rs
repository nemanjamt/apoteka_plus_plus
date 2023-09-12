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
use services::report_orders::*;






#[get("/report_orders?<query_params..>")]
pub async fn get_reports(query_params:ReportQueryParams,jwt: Jwt) -> Custom<Json<ApiResponse<Vec<ItemReport>>>> {
    println!("{:?}", query_params);
    let response = services::report_orders::get_reports(jwt, query_params).await;
    Custom(rocket::http::Status::new(response.status_code), Json(response))
}
