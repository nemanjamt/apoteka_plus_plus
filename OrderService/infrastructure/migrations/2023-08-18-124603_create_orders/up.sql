-- Your SQL goes here
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    address VARCHAR,
    deliverer_id INTEGER,
    delivery BOOLEAN NOT NULL DEFAULT false,
    order_status VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL,
    finished_at TIMESTAMP,
    note VARCHAR NOT NULL
);