// @generated automatically by Diesel CLI.

diesel::table! {
    products (id) {
        id -> Int4,
        name -> Varchar,
        description -> Text,
        price -> Float8,
        available -> Bool,
        deleted -> Bool,
    }
}
