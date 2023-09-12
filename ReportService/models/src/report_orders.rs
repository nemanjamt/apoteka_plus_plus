
use rocket::serde::{Deserialize, Serialize};
use chrono::NaiveDateTime;
use chrono::NaiveDate;
use rocket::response::status::Custom;
use rocket::Request;
use reqwest::header::{HeaderMap, AUTHORIZATION};
use rocket::http::Status;
use rocket::request::Outcome;
use rocket::request::{self, FromRequest};
use rocket::form::{FromForm};

#[derive(Debug, FromForm, Serialize, Deserialize)]
pub struct DateTimeCustom{
    pub day : u32,
    pub month : u32,
    pub year : i32
}

#[derive(Debug, Deserialize,FromForm, Serialize)]
pub struct ReportQueryParams{
    pub start_date: DateTimeCustom,
    pub end_date: Option<DateTimeCustom>
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Order {
    pub id: i32,
    pub user_id: i32,
    pub address: Option<String>,
    pub deliverer_id: Option<i32>,
    pub delivery: bool,
    pub order_status: String,
    pub created_at : NaiveDateTime,
    pub finished_at : NaiveDateTime,
    pub items: Vec<OrderItem>,
    pub note : String
}

#[derive(Serialize, Deserialize, Debug)]
pub struct OrderItem{
    pub id: i32,
    pub quantity : i32,
    pub product_id : i32,
    pub order_id : i32,
    pub price : f64,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ItemReport{
    pub date: NaiveDate,
    pub value: f64
}



#[rocket::async_trait]
impl<'r> FromRequest<'r> for Jwt {
    type Error = ();

    async fn from_request(request: &'r Request<'_>) -> request::Outcome<Jwt, ()> {
        match request.headers().get_one("Authorization") {
            Some(jwt) => Outcome::Success(Jwt(jwt.to_string())),
            None => Outcome::Failure((Status::BadRequest, ())),
        }
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Jwt(pub String);


