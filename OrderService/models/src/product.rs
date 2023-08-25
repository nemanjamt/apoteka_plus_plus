use crate::schema::orders;
use crate::schema::order_item;
use diesel::prelude::*;
use rocket::serde::{Deserialize, Serialize};

#[derive( Serialize, Deserialize, Debug)]
pub struct BasicProductData {
    pub id: i32,
    pub name: String,
    pub image: String
}