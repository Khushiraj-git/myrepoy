// Database Schema (PostgreSQL)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60),
    email VARCHAR(255) UNIQUE,
    address VARCHAR(400),
    password VARCHAR(255),
    role VARCHAR(50)
);

CREATE TABLE stores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    address VARCHAR(400)
);

CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    store_id INT REFERENCES stores(id),
    rating INT CHECK (rating >= 1 AND rating <= 5)
);
