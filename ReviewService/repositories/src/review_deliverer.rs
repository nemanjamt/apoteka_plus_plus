use infrastructure::establish_connection;
use models::schema::*;
use models::review_deliverer::*;
use diesel::result::Error;
use diesel::prelude::*;

pub fn create_review_deliverer(connection: &mut PgConnection, new_review_deliverer: NewReviewDeliverer) -> Result<ReviewDeliverer, Error>{
    diesel::insert_into(models::schema::review_deliverer::dsl::review_deliverer)
            .values(new_review_deliverer)
            .get_result::<ReviewDeliverer>(connection)
}

pub fn get_review_deliverer_by_id(connection: &mut PgConnection, review_id:i32) -> Result<ReviewDeliverer, Error>{
    review_deliverer::table.find(review_id).filter(review_deliverer::deleted.eq(false))
    .first::<ReviewDeliverer>(connection)
}

pub fn find_all_deliverers_reviews(connection: &mut PgConnection, deliverer_id:i32) -> Result<Vec<ReviewDeliverer>, Error>{
    review_deliverer::table.filter(review_deliverer::deliverer_id.eq(deliverer_id))
                        .filter(review_deliverer::deleted.eq(false))
                        .load::<ReviewDeliverer>(connection)
}

pub fn find_review_by_deliverer_and_user(connection: &mut PgConnection, deliverer_id:i32, user_id:i32)-> Result<ReviewDeliverer, Error>{
    review_deliverer::table.filter(review_deliverer::deliverer_id.eq(deliverer_id))
                        .filter(review_deliverer::user_id.eq(user_id))
                        .filter(review_deliverer::deleted.eq(false))
                        .first::<ReviewDeliverer>(connection)

}


pub fn change_review_deliverer(connection: &mut PgConnection,review_id:i32, change_request: ChangeReviewDeliverer)-> Result<ReviewDeliverer, Error>{
    diesel::update(review_deliverer::table.filter(review_deliverer::id.eq(review_id)).filter(review_deliverer::reported.eq(false))
                                        .filter(review_deliverer::deleted.eq(false)))
            .set(change_request)
            .returning(review_deliverer::all_columns)
            .get_result::<ReviewDeliverer>(connection)
}


pub fn report_review_deliverer(connection: &mut PgConnection, review_id:i32) -> Result<ReviewDeliverer, Error>{
    diesel::update(review_deliverer::table.filter(review_deliverer::id.eq(review_id)).filter(review_deliverer::reported.eq(false))
                                        .filter(review_deliverer::deleted.eq(false)))
            .set(review_deliverer::reported.eq(true))
            .returning(review_deliverer::all_columns)
            .get_result::<ReviewDeliverer>(connection)
}

pub fn delete_review_deliverer(connection: &mut PgConnection, review_id:i32) -> Result<ReviewDeliverer, Error>{
    diesel::update(review_deliverer::table.filter(review_deliverer::id.eq(review_id))
                                        .filter(review_deliverer::deleted.eq(false)))
                    .set(review_deliverer::deleted.eq(true))
                    .returning(review_deliverer::all_columns)
                    .get_result::<ReviewDeliverer>(connection)
}




pub fn get_reported_review_deliverer(connection: &mut PgConnection)->Result<Vec<ReviewDeliverer>, Error>{
    review_deliverer::table
                        .filter(review_deliverer::reported.eq(true))
                        .filter(review_deliverer::deleted.eq(false))
                        .load::<ReviewDeliverer>(connection)
}