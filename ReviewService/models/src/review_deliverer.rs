use crate::schema::review_deliverer;
use diesel::prelude::*;
use rocket::serde::{Deserialize, Serialize};
use chrono::NaiveDateTime;
use rocket_validation::{Validate};
use rocket::form::{FromForm};

#[derive(Queryable,Identifiable, Selectable, Serialize,  Debug)]
#[diesel(table_name = review_deliverer)]
pub struct ReviewDeliverer {
    pub id: i32,
    pub user_id: i32,
    pub deliverer_id: i32,
    pub comment: String,
    pub mark: f64,
    pub reported: bool,
    pub deleted: bool
}

#[derive(Insertable, Serialize, Deserialize, Validate)]
#[diesel(table_name = review_deliverer)]
pub struct NewReviewDeliverer{
    pub user_id: i32,
    pub deliverer_id: i32,
    pub comment: String,
    #[validate(range(min = 0, max = 5))]
    pub mark: f64
}
#[derive(AsChangeset, Serialize, Deserialize, Validate)]
#[diesel(table_name = review_deliverer)]
pub struct ChangeReviewDeliverer{
    pub comment: String,
    #[validate(range(min = 0, max = 5))]
    pub mark: f64
}