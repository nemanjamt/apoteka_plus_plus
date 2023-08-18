



#[macro_use] extern crate rocket;
use rocket::{launch, routes};
// use controllers::*;
use shared::error_catchers::*;



#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![controllers::product::find_product_by_id,
                            controllers::product::create_product, 
                            controllers::product::search_products,
                            controllers::product::change_product,
                            controllers::product::find_basic_product_data_by_id,
                            controllers::product::delete_product])
        .register("/",catchers![internal_error, unprocessable_entity, bad_request])

}