use crate::schema::products;
use diesel::{prelude::*};
use serde::{Serialize, Deserialize};
use rocket_validation::{Validate};
// use rocket::form::{Form};
use rocket::form::{FromForm};


#[derive(Queryable, Serialize, Deserialize, Debug)]
#[diesel(primary_key(id))]
#[diesel(table_name = products)]
pub struct Product {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub price: f64,
    pub image: String,
    pub available: bool,
    pub deleted: bool
}

#[derive(Queryable, Selectable, Serialize, Deserialize, Debug)]
#[diesel(table_name = products)]
pub struct BasicProductData {
    pub id: i32,
    pub name: String,
    pub image: String
}
#[derive(Serialize, Deserialize, Validate)]
pub struct NewProductRequest{
    #[validate(length(min = 2))]
    pub name: String,
    pub description: String,
    #[validate(range(min = 0, max = 100000))]
    pub price: f64,
    pub image: String
}

#[derive(Insertable, Serialize, Deserialize, Validate)]
#[diesel(table_name = products)]
pub struct NewProduct {
    #[validate(length(min = 2))]
    pub name: String,
    pub description: String,
    #[validate(range(min = 0, max = 100000))]
    pub price: f64
}

#[derive(AsChangeset, Serialize, Deserialize, Validate)]
#[diesel(table_name = products)]
pub struct UpdatedProduct {
    #[validate(length(min = 2))]
    pub name: String,
    pub description: String,
    #[validate(range(min = 0, max = 100000))]
    pub price: f64,
    pub available: bool
}

#[derive(AsChangeset, Serialize, Deserialize, Validate)]
#[diesel(table_name = products)]
pub struct UpdatedProductRequest {
    #[validate(length(min = 2))]
    pub name: String,
    pub description: String,
    #[validate(range(min = 0, max = 100000))]
    pub price: f64,
    pub available: bool,
    pub image: String
}

#[derive(Debug, FromForm, Deserialize)]
pub struct ProductQueryParams {
    pub product_name: Option<String>,
    pub min_price: Option<f64>,
    pub max_price: Option<f64>,
    pub is_available: Option<bool>,
    pub sort_by: Option<String>,
    pub order:Option<String>,
    pub page: Option<i64>,
}