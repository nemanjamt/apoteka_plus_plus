#[macro_use] extern crate rocket;
use rocket::{launch, routes};
use controllers::*;
use shared::error_catchers::*;

#[launch]
fn rocket() -> _ {
    let figment = rocket::Config::figment()
        .merge(("port", 8002));
        rocket::custom(figment)
        .mount("/api", routes![review_product::create_review_product,
                                review_product::get_review_product_by_id,
                                review_product::get_reviews_product_by_product_id,
                                review_product::change_review_product,
                                review_product::delete_reviews_product,
                                review_product::report_review_product,
                                review_product::get_reported_reviews,
                                review_product::unreport_review_product,
                                review_product::get_reviews_product_by_user_and_product_id,
                                review_deliverer::create_review_deliverer,
                                review_deliverer::get_review_deliverer_by_id,
                                review_deliverer::get_all_deliverers_reviews,
                                review_deliverer::get_review_deliverer_by_deliverer_order,
                                review_deliverer::change_review_deliverer,
                                review_deliverer::report_review_deliverer,
                                review_deliverer::unreport_review_deliverer,
                                review_deliverer::delete_reviews_deliverer,
                                review_deliverer::get_reported_reviews])
        .register("/",catchers![internal_error, unprocessable_entity, bad_request])

}