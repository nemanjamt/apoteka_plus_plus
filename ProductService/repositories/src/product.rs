
use infrastructure::establish_connection;
use models::schema::*;
use models::product::{Product, NewProduct, UpdatedProduct, BasicProductData};
use diesel::result::Error;
use diesel::prelude::*;
// use diesel::select;

// const DEFAULT_PAGE_SIZE: i64 = 10;

pub fn find_product_by_id(product_id : i32) -> Result<Product, Error>{
    let connection = &mut establish_connection();
    products::table.filter(products::id.eq(product_id)).filter(products::deleted.eq(false)).first::<Product>(connection)
}

pub fn find_basic_product_data_by_id(product_id : i32) -> Result<BasicProductData, Error>{
    let connection = &mut establish_connection();
    products::table.select((products::id, products::name))
        .filter(products::id.eq(product_id))
        .first(connection)
    // products::table.filter(products::id.eq(product_id)).first::<BasicProductData>(connection)
}

pub fn create_product(product_request: NewProduct) -> Result<Product, Error>{
    let connection = &mut establish_connection();
    diesel::insert_into(models::schema::products::dsl::products)
                        .values(product_request)
                        .get_result::<Product>(connection)
}

pub fn change_product(product_id: i32, product_request:UpdatedProduct) -> Result<Product, Error>{
    let connection = &mut establish_connection();
    diesel::update(products::table.filter(products::id.eq(product_id)).filter(products::deleted.eq(false)))
    .set(&product_request)
    .get_result::<Product>(connection)
}

pub fn delete_product(product_id: i32) -> Result<Product, Error>{
    let connection = &mut establish_connection();
    diesel::update(products::table.filter(products::id.eq(product_id)).filter(products::deleted.eq(false)))
    .set(products::deleted.eq(true))
    .get_result::<Product>(connection)
}

pub fn search_product(product_name:Option<String>, min_price:Option<f64>, max_price:Option<f64>, is_available: Option<bool>, sort_by:Option<String>,
order:Option<String>, page:Option<i64>, per_page:i64) -> Result<Vec<Product>, Error>{
    use models::schema::products::dsl::*;    
    let mut query = products.into_boxed();
    let connection = &mut establish_connection();
    query = query.filter(deleted.eq(false));
    
    if let Some(product_name) = product_name {
        println!("{:?}", product_name);
        query = query.filter(name.ilike(format!("%{}%", product_name)));
    }

   
    if let Some(min_price) = min_price {
        query = query.filter(price.ge(min_price));
    }

    
    if let Some(max_price) = max_price {
        query = query.filter(price.le(max_price));
    }

   
    if let Some(is_available) = is_available {
        query = query.filter(available.eq(is_available));
    }

    
    if let Some(sort_by) = sort_by {
        match sort_by.as_str() {
            "name" => {
                query = if let Some(order) = order {
                    match order.as_str() {
                        "asc" => query.order(name.asc()),
                        "desc" => query.order(name.desc()),
                        _ => query,
                    }
                } else {
                    query.order(name.asc())
                };
            }
            "price" => {
                query = if let Some(order) = order {
                    match order.as_str() {
                        "asc" => query.order(price.asc()),
                        "desc" => query.order(price.desc()),
                        _ => query,
                    }
                } else {
                    query.order(price.asc())
                };
            }
            _ => {}
        }
    }

    // Paginacija
    let page = page.unwrap_or(1);
    let offset = (page - 1) * per_page;
    query = query.offset(offset).limit(per_page);
    query.load::<Product>(connection)
}
