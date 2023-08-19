use crate::schema::orders;
use crate::schema::order_item;
use crate::schema::delivery_request;
use diesel::prelude::*;
use rocket::serde::{Deserialize, Serialize};
use chrono::NaiveDateTime;
use rocket_validation::{Validate, Validated};


#[derive(Queryable, Identifiable, Selectable, Serialize, Debug)]
#[diesel(table_name = delivery_request)]
pub struct DeliveryRequest {
    pub id: i32,
    pub deliverer_id: i32,
    pub order_id : i32,
}


#[derive(Insertable, Serialize, Deserialize, Debug, Validate)]
#[diesel(table_name = delivery_request)]
pub struct NewDeliveryRequest{
    pub order_id : i32,
    pub deliverer_id: i32
}

#[derive(Serialize, Deserialize)]
pub struct DeliveryRequestInfo{
    pub id: i32,
    pub deliverer_id: i32,
    pub order_id : i32,
    pub address: String,
    //pub deliverer_name: String
}