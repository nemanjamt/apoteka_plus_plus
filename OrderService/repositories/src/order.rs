use infrastructure::establish_connection;
use models::schema::*;
use models::order::{Order, NewOrder, ChangeOrder};
use diesel::result::Error;
use diesel::prelude::*;
use diesel::dsl::*;
use models::order::DateTimeCustom;
use chrono::{NaiveDateTime, NaiveTime, NaiveDate};
pub fn find_order_by_id(connection: &mut PgConnection, order_id: i32) -> Result<Order, Error>{
    orders::table.find(order_id)
    .first::<Order>(connection)
}

pub fn find_delivery_order_by_id(connection: &mut PgConnection, order_id: i32) -> Result<Order, Error>{
    orders::table.find(order_id).filter(orders::delivery.eq(true))
    .first::<Order>(connection)
}


pub fn create_order(connection: &mut PgConnection, new_order: NewOrder) -> Result<Order, Error>{
    diesel::insert_into(models::schema::orders::dsl::orders)
            .values(new_order)
            .get_result::<Order>(connection)
}

pub fn find_order_by_user_id(connection: &mut PgConnection, user_id:i32) -> Result<Vec<Order>, Error>{
    orders::table.filter(orders::user_id.eq(user_id)).load::<Order>(connection)
}

pub fn find_order_by_deliverer_id(connection: &mut PgConnection, deliverer_id:i32) -> Result<Vec<Order>, Error>{
    orders::table.filter(orders::deliverer_id.eq(deliverer_id)).load::<Order>(connection)
}

pub fn change_order(connection : &mut PgConnection, order_id:i32, update_order: ChangeOrder) -> Result<Order, Error>{
    // let connection = &mut establish_connection();
    diesel::update(orders::table.filter(orders::id.eq(order_id)))
            .set(update_order)
            .returning(orders::all_columns)
            .get_result::<Order>(connection)
}

pub fn change_order_status(connection: &mut PgConnection,order_id:i32, order_status: String)->Result<Order, Error>{
    diesel::update(orders::table.filter(orders::id.eq(order_id)))
            .set(orders::order_status.eq(order_status))
            .returning(orders::all_columns)
            .get_result::<Order>(connection)
}

pub fn set_finish_time(connection: &mut PgConnection, order_id:i32, finish_time: NaiveDateTime)->Result<Order, Error>{
    diesel::update(orders::table.filter(orders::id.eq(order_id)))
            .set(orders::finished_at.eq(finish_time))
            .returning(orders::all_columns)
            .get_result::<Order>(connection)

}

pub fn delete_order(connection: &mut PgConnection, order_id:i32) -> Result<Order, Error>{
    diesel::delete(orders::table.filter(orders::id.eq(order_id)))
        .returning(orders::all_columns)
        .get_result(connection)
}

pub fn add_deliverer_and_status(connection: &mut PgConnection, order_id:i32, deliverer_id:i32, status:String) -> Result<Order, Error>{
    diesel::update(orders::table.filter(orders::id.eq(order_id))
                                .filter(orders::delivery.eq(true)))
            .set((orders::deliverer_id.eq(deliverer_id), orders::order_status.eq(status)))
            .returning(orders::all_columns)
            .get_result::<Order>(connection)
}

pub fn find_user_ordered_product(user_id: i32, product_id: i32, conn: &mut PgConnection) -> Result<bool, Error> {
    let exists: bool = diesel::select(exists(
        order_item::table
            .inner_join(orders::table)
            .filter(
                order_item::product_id.eq(product_id)
                    .and(orders::user_id.eq(user_id))
                    .and(orders::order_status.eq("FINISHED".to_string()))
            )
    ))
    .get_result(conn)?;

Ok(exists)
}

pub fn search_orders(connection: &mut PgConnection, query_user_id : Option<i32>, query_delivery:Option<bool>, query_deliverer_id: Option<i32>,
     query_order_status: Option<String>, query_start_date: Option<DateTimeCustom>, query_end_date: Option<DateTimeCustom>) -> Result<Vec<Order>, Error>{
        use models::schema::*;
        use models::schema::orders::dsl::*;
        
    let mut query = orders.into_boxed();

    // Apply filters based on query parameters
    if let Some(query_user_id) = query_user_id {
        query = query.filter(user_id.eq(query_user_id));
    }
    if let Some(query_delivery) = query_delivery {
        query = query.filter(delivery.eq(query_delivery));
    }
    if let Some(query_deliverer_id) = query_deliverer_id {
        query = query.filter(deliverer_id.eq(query_deliverer_id));
    }
    if let Some(query_order_status) = query_order_status {
        query = query.filter(order_status.eq(query_order_status));
    }
    if let Some(query_start_date) = query_start_date {
        let date = NaiveDate::from_ymd(query_start_date.year, query_start_date.month, query_start_date.day);
        let time = NaiveTime::from_hms(0, 0, 0);
        let datetime = NaiveDateTime::new(date, time);
        println!("{:?}",datetime);
        query = query.filter(finished_at.ge(datetime));
    }
    if let Some(query_end_date) = query_end_date {
        let date = NaiveDate::from_ymd(query_end_date.year, query_end_date.month, query_end_date.day);
        let time = NaiveTime::from_hms(23, 59, 59);
        let datetime = NaiveDateTime::new(date, time);
        println!("{:?}",datetime);
        query = query.filter(finished_at.le(datetime));
    }

    

    query = query.order(created_at.desc());

    query.load::<Order>(connection) 

   
}