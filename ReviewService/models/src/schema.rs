// @generated automatically by Diesel CLI.

diesel::table! {
    review_deliverer (id) {
        id -> Int4,
        user_id -> Int4,
        deliverer_id -> Int4,
        comment -> Varchar,
        mark -> Float8,
        reported -> Bool,
        deleted -> Bool,
    }
}

diesel::table! {
    review_product (id) {
        id -> Int4,
        user_id -> Int4,
        product_id -> Int4,
        comment -> Varchar,
        mark -> Float8,
        reported -> Bool,
        deleted -> Bool,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    review_deliverer,
    review_product,
);
