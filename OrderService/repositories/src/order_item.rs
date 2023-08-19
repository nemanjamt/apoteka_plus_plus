use infrastructure::establish_connection;
use models::schema::*;
use models::order::*;
use diesel::result::Error;
use diesel::prelude::*;

pub fn find_order_items_by_order_id(connection: &mut PgConnection,order_id: i32) -> Result<Vec<OrderItem>, Error>{
    let connection = &mut establish_connection();
    order_item::table.select(order_item::all_columns)
                            .filter(order_item::order_id.eq(order_id))
                            .load::<OrderItem>(connection)
}


pub fn create_order_items(connection: &mut PgConnection, order_id:i32,  items:Vec<NewOrderItem>) -> Result<Vec<OrderItem>, Error>{
    diesel::insert_into(order_item::table)
        .values(&items)
        .returning(order_item::all_columns)
        .get_results(connection)
}

pub fn create_order_item(connection: &mut PgConnection,item:NewOrderItem) -> Result<OrderItem, Error>{
    diesel::insert_into(order_item::table)
        .values(&item)
        .returning(order_item::all_columns)
        .get_result(connection)
}

pub fn delete_order_items_by_order_id(connection: &mut PgConnection,order_id:i32) -> Result<Vec<OrderItem>, Error>{
    diesel::delete(order_item::table.filter(order_item::order_id.eq(order_id)))
        .returning(order_item::all_columns)
        .get_results(connection)
}

pub fn change_quantity(connection: &mut PgConnection, order_item_id:i32, quantity:i32) -> Result<OrderItem, Error>{
    diesel::update(order_item::table.filter(order_item::id.eq(order_item_id)))
            .set(order_item::quantity.eq(quantity))
            .returning(order_item::all_columns)
            .get_result::<OrderItem>(connection)
}

pub fn delete_order_item(connection: &mut PgConnection, order_item_id:i32) -> Result<OrderItem, Error>{
    diesel::delete(order_item::table.filter(order_item::id.eq(order_item_id)))
        .returning(order_item::all_columns)
        .get_result(connection)
}

pub fn find_order_items_by_order_id_and_product_id(connection: &mut PgConnection, order_id:i32, product_id:i32)-> Result<OrderItem, Error>{
    order_item::table.select(order_item::all_columns)
                            .filter(order_item::order_id.eq(order_id))
                            .filter(order_item::product_id.eq(product_id))
                            .first::<OrderItem>(connection)
}