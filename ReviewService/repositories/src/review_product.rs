use infrastructure::establish_connection;
use models::schema::*;
use models::review_product::*;
use diesel::result::Error;
use diesel::prelude::*;

pub fn create_review_product(connection: &mut PgConnection, new_review_product: NewReviewProduct) -> Result<ReviewProduct, Error>{
    diesel::insert_into(models::schema::review_product::dsl::review_product)
            .values(new_review_product)
            .get_result::<ReviewProduct>(connection)
}

pub fn get_review_product_by_id(connection: &mut PgConnection, review_id:i32) -> Result<ReviewProduct, Error>{
    review_product::table.find(review_id).filter(review_product::deleted.eq(false))
    .first::<ReviewProduct>(connection)
}

pub fn get_reviews_product_by_product_id(connection: &mut PgConnection, product_id:i32)->Result<Vec<ReviewProduct>, Error>{
    review_product::table.filter(review_product::product_id.eq(product_id))
                        .filter(review_product::deleted.eq(false))
                        .load::<ReviewProduct>(connection)
}

pub fn get_reported_reviews_product(connection: &mut PgConnection)->Result<Vec<ReviewProduct>, Error>{
    review_product::table
                        .filter(review_product::reported.eq(true))
                        .filter(review_product::deleted.eq(false))
                        .load::<ReviewProduct>(connection)
}

pub fn get_review_product_by_user_id_and_product_id(connection: &mut PgConnection, user_id:i32, product_id:i32)->Result<ReviewProduct, Error>{
    review_product::table.filter(review_product::user_id.eq(user_id))
                        .filter(review_product::product_id.eq(product_id))
                        .filter(review_product::deleted.eq(false))
                        .first::<ReviewProduct>(connection)
}

pub fn change_review_product(connection: &mut PgConnection,review_id:i32, change_request: ChangeReviewProduct)-> Result<ReviewProduct, Error>{
    diesel::update(review_product::table.filter(review_product::id.eq(review_id)).filter(review_product::reported.eq(false))
                                        .filter(review_product::deleted.eq(false)))
            .set(change_request)
            .returning(review_product::all_columns)
            .get_result::<ReviewProduct>(connection)
}

pub fn delete_review_product(connection: &mut PgConnection, review_id:i32) -> Result<ReviewProduct, Error>{
    diesel::update(review_product::table.filter(review_product::id.eq(review_id))
                                        .filter(review_product::deleted.eq(false)))
            .set(review_product::deleted.eq(true))
            .returning(review_product::all_columns)
            .get_result::<ReviewProduct>(connection)
}

pub fn report_review_product(connection: &mut PgConnection, review_id:i32) -> Result<ReviewProduct, Error>{
    diesel::update(review_product::table.filter(review_product::id.eq(review_id))
                                        .filter(review_product::reported.eq(false))
                                        .filter(review_product::deleted.eq(false)))
            .set(review_product::reported.eq(true))
            .returning(review_product::all_columns)
            .get_result::<ReviewProduct>(connection)
}

pub fn unreport_review_product(connection: &mut PgConnection, review_id:i32) -> Result<ReviewProduct, Error>{
    diesel::update(review_product::table.filter(review_product::id.eq(review_id))
                                        .filter(review_product::reported.eq(true))
                                        .filter(review_product::deleted.eq(false)))
            .set(review_product::reported.eq(false))
            .returning(review_product::all_columns)
            .get_result::<ReviewProduct>(connection)
}