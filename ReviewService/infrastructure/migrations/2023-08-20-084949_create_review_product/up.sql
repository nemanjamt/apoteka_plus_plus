-- Your SQL goes here
CREATE TABLE review_product(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    comment VARCHAR NOT NULL,
    mark FLOAT NOT NULL,
    reported BOOLEAN NOT NULL DEFAULT false,
    deleted BOOLEAN NOT NULL DEFAULT false
);