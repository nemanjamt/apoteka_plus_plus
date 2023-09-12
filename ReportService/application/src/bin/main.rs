#[macro_use] extern crate rocket;
use rocket::{launch, routes};
use controllers::*;
use shared::error_catchers::*;
use rocket::Request;
// use reqwest::header::{HeaderMap, AUTHORIZATION};
use rocket::http::Status;

#[launch]
fn rocket() -> _ {
    let figment = rocket::Config::figment()
        .merge(("port", 8003));
        rocket::custom(figment)
        .mount("/api", routes![report_orders::get_reports])
        .register("/",catchers![internal_error, unprocessable_entity, bad_request])

}