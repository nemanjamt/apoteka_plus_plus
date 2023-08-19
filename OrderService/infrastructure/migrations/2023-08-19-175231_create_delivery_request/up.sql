-- Your SQL goes here
CREATE TABLE delivery_request(
    id SERIAL PRIMARY KEY,
    deliverer_id INTEGER NOT NULL,
    order_id SERIAL REFERENCES orders(id) ON DELETE CASCADE
);