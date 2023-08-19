// @generated automatically by Diesel CLI.

diesel::table! {
    order_item (id) {
        id -> Int4,
        quantity -> Int4,
        product_id -> Int4,
        order_id -> Int4,
        price -> Float8,
    }
}

diesel::table! {
    orders (id) {
        id -> Int4,
        user_id -> Int4,
        address -> Nullable<Varchar>,
        deliverer_id -> Nullable<Int4>,
        delivery -> Bool,
        order_status -> Varchar,
        created_at -> Timestamp,
        finished_at -> Nullable<Timestamp>,
        note -> Varchar,
    }
}

diesel::joinable!(order_item -> orders (order_id));

diesel::allow_tables_to_appear_in_same_query!(
    order_item,
    orders,
);
