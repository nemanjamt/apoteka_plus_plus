#[macro_use] extern crate rocket;
use rocket::{launch, routes};
// use controllers::*;
// use shared::error_catchers::*;
use controllers::*;
use rocket::config::{Config};

#[launch]
fn rocket() -> _ {
    let figment = rocket::Config::figment()
        .merge(("port", 8001));
        rocket::custom(figment)
        .mount("/api", routes![order::find_order_by_id,
                                order::create_order,
                                order::change_order,
                                order::change_order_status,
                                order::delete_order,
                                order_item::change_quantity_order_item,
                                order_item::delete_order_item,
                                order_item::create_order_item])
        // .register("/",catchers![internal_error, unprocessable_entity, bad_request])

}