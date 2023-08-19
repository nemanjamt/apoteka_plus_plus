use infrastructure::establish_connection;
use models::schema::*;
use models::order::{Order, NewOrder, ChangeOrder};
use diesel::result::Error;
use diesel::prelude::*;
use chrono::{NaiveDateTime};
pub fn find_order_by_id(connection: &mut PgConnection, order_id: i32) -> Result<Order, Error>{
    let connection = &mut establish_connection();
    orders::table.find(order_id)
    .first::<Order>(connection)
}


pub fn create_order(connection: &mut PgConnection, new_order: NewOrder) -> Result<Order, Error>{
    diesel::insert_into(models::schema::orders::dsl::orders)
            .values(new_order)
            .get_result::<Order>(connection)
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

pub fn add_deliverer(connection: &mut PgConnection, order_id:i32, deliverer_id:i32) -> Result<Order, Error>{
    diesel::update(orders::table.filter(orders::id.eq(order_id))
                                .filter(orders::delivery.eq(true)))
            .set(orders::deliverer_id.eq(deliverer_id))
            .returning(orders::all_columns)
            .get_result::<Order>(connection)
}