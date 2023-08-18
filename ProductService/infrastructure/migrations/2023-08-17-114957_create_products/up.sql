-- Your SQL goes here
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT NOT NULL,
  price FLOAT NOT NULL,
  available BOOLEAN NOT NULL DEFAULT TRUE,
  deleted BOOLEAN NOT NULL DEFAULT FALSE
)