-- Your SQL goes here
CREATE TABLE review_deliverer(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    deliverer_id INTEGER NOT NULL,
    order_id INTEGER NOT NULL,
    comment VARCHAR NOT NULL,
    mark FLOAT NOT NULL,
    reported BOOLEAN NOT NULL DEFAULT false,
    deleted BOOLEAN NOT NULL DEFAULT false
);