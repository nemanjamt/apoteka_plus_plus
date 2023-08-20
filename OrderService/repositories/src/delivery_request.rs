extern crate rocket;
extern crate diesel;
use models::delivery_request::{DeliveryRequest, NewDeliveryRequest};
use models::schema::*;
use diesel::prelude::*;
use diesel::result::Error;





pub fn create_delivery_request(connection : &mut PgConnection, new_delivery_request: NewDeliveryRequest)-> Result<DeliveryRequest, Error>{
    diesel::insert_into(models::schema::delivery_request::dsl::delivery_request)
            .values(new_delivery_request)
            .returning(models::schema::delivery_request::all_columns)
            .get_result::<DeliveryRequest>(connection)
}

pub fn find_by_deliverer_id_and_order_id(connection : &mut PgConnection, deliverer_id:i32, order_id:i32)-> Result<DeliveryRequest, Error>{
    delivery_request::table.filter(delivery_request::order_id.eq(order_id)).filter(delivery_request::deliverer_id.eq(deliverer_id))
    .first::<DeliveryRequest>(connection)
}


pub fn delete_delivery_request(connection: &mut PgConnection, delivery_request_id:i32) -> Result<DeliveryRequest, Error>{
    diesel::delete(delivery_request::table.filter(delivery_request::id.eq(delivery_request_id)))
        .returning(delivery_request::all_columns)
        .get_result(connection)
}
pub fn find_by_order_id(connection : &mut PgConnection,  order_id:i32)-> Result<Vec<DeliveryRequest>, Error>{
    delivery_request::table.filter(delivery_request::order_id.eq(order_id))
    .load::<DeliveryRequest>(connection)
}

pub fn find_by_id(connection : &mut PgConnection,  delivery_request_id:i32)-> Result<DeliveryRequest, Error>{
    delivery_request::table.filter(delivery_request::id.eq(delivery_request_id))
    .first::<DeliveryRequest>(connection)
}
