-- Your SQL goes here
CREATE TABLE order_item(
    id SERIAL PRIMARY KEY,
    quantity INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    order_id SERIAL REFERENCES orders(id) ON DELETE CASCADE,
    price FLOAT NOT NULL
);