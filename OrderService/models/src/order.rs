use crate::schema::orders;
use crate::schema::order_item;
use diesel::prelude::*;
use rocket::serde::{Deserialize, Serialize};
use chrono::NaiveDateTime;
use rocket_validation::{Validate};
use rocket::form::{FromForm};



#[derive(Debug, FromForm, Deserialize)]
pub struct DateTimeCustom{
    pub day : u32,
    pub month : u32,
    pub year : i32
}

#[derive(Debug, FromForm, Deserialize)]
pub struct OrdersQueryParams{
    pub user_id: Option<i32>,
    pub delivery: Option<bool>,
    pub deliverer_id: Option<i32>,
    pub order_status: Option<String>,
    pub start_date: Option<DateTimeCustom>,
    pub end_date: Option<DateTimeCustom>
}


#[derive(Queryable,Identifiable, Selectable, Serialize,  Debug)]
#[diesel(table_name = orders)]
pub struct Order {
    pub id: i32,
    pub user_id: i32,
    pub address: Option<String>,
    pub deliverer_id: Option<i32>,
    pub delivery: bool,
    pub order_status: String,
    pub created_at : NaiveDateTime,
    pub finished_at : Option<NaiveDateTime>,
    pub note : String
}

#[derive(Queryable, Identifiable, Selectable, Serialize,Deserialize,  Debug, Associations)]
#[diesel(belongs_to(Order))]
#[diesel(table_name = order_item)]
pub struct OrderItem {
    pub id: i32,
    pub quantity : i32,
    pub product_id : i32,
    pub order_id : i32,
    pub price : f64,
}

#[derive(Serialize)]
pub struct OrderWithItems{
    pub id: i32,
    pub user_id: i32,
    pub address: Option<String>,
    pub deliverer_id: Option<i32>,
    pub delivery: bool,
    pub order_status: String,
    pub created_at: NaiveDateTime,
    pub finished_at: Option<NaiveDateTime>,
    pub items: Vec<OrderItem>,
    pub note: String
}

#[derive(Serialize)]
pub struct OrderWithLoadedItems{
    pub id: i32,
    pub user_id: i32,
    pub address: Option<String>,
    pub deliverer_id: Option<i32>,
    pub delivery: bool,
    pub order_status: String,
    pub created_at: NaiveDateTime,
    pub finished_at: Option<NaiveDateTime>,
    pub items: Vec<LoadedOrderItem>,
    pub note: String
}


#[derive(Deserialize, Serialize)]
pub struct LoadedOrderItem {
    pub id: i32,
    pub quantity : i32,
    pub product_id : i32,
    pub price : f64,
    pub name: String,
    pub image: String
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = orders)]
pub struct NewOrder{
    pub user_id: i32,
    pub address: Option<String>,
    pub deliverer_id: Option<i32>,
    pub delivery: bool,
    pub order_status: String, 
    pub created_at: NaiveDateTime,
    pub finished_at: Option<NaiveDateTime>,
    pub note: String
}


#[derive(AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = orders)]
pub struct ChangeOrder{
    pub address: Option<String>,
    pub delivery: bool,
    pub note: String
}

#[derive(AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = orders)]
pub struct AddOrderDeliverer{
    pub deliverer_id: i32,
}

#[derive(AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = orders)]
pub struct ChangeOrderStatus{
    pub order_status: String,
    pub finished_at : Option<NaiveDateTime>
}

#[derive(Insertable, Serialize, Deserialize, Validate)]
#[diesel(table_name = order_item)]
pub struct NewOrderItem{
    #[validate(range(min = 0, max = 100))]
    pub quantity : i32,
    pub product_id : i32,
    #[validate(range(min = 0, max = 1000000))]
    pub price : f64,
    pub order_id: i32
}



#[derive(Deserialize, Serialize, Validate)]
pub struct OrderItemCreateRequest{
    #[validate(range(min = 0, max = 100))]
    pub quantity : i32,
    pub product_id : i32,
    #[validate(range(min = 0, max = 100000))]
    pub price: f64
}

#[derive(Deserialize, Serialize, Validate)]
pub struct OrderCreateRequest{
    pub user_id: i32,
    pub address: Option<String>,
    pub deliverer_id: Option<i32>,
    pub delivery: bool,
    pub note: String,
    #[validate]
    pub items: Vec<OrderItemCreateRequest>
}

#[derive(Deserialize, Serialize, Validate)]
pub struct OrderChangeRequest{
    pub address: Option<String>,
    pub delivery: bool,
    pub note: String
}







