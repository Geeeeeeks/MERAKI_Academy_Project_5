const { Pool } = require("pg");

const connectionString = process.env.DB_URL;

const pool = new Pool({
  connectionString,
});
const createTable =()=>{
  const query =`
  
  CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE permissions (
    permission_id SERIAL PRIMARY KEY,
    permission VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE role_permission (
    id SERIAL PRIMARY KEY,
    role_id INT,
    permission_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    FOREIGN KEY (permission_id) REFERENCES permissions(permission_id)
);

CREATE TABLE users(
  id SERIAL NOT NULL,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  age INT,
  country VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role_id INT,
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (role_id) REFERENCES roles(role_id),
  PRIMARY KEY (id)
);

CREATE TABLE carts (
    id SERIAL NOT NULL,
    product_id INT,
    user_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY (id)
);

CREATE TABLE wishlists (
    id SERIAL NOT NULL,
    product_id INT,
    user_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY (id)
);

CREATE TABLE categories (
    id SERIAL NOT NULL,
    category VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE products (
    id SERIAL NOT NULL,
    title VARCHAR(255),
    descriptions VARCHAR(255),
    category_id INT,
    img VARCHAR(250) NOT NULL,
    price INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    PRIMARY KEY (id),
    is_deleted SMALLINT DEFAULT 0,
    in_stock SMALLINT DEFAULT 0
);

  `
  pool.query(query).then((result)=>{console.log(result);}).catch((err)=>{console.log(err);})
}
//createTable()
pool.connect((err, pool) => {
  if (err) {
    console.error("error", err.message, err.stack);
    return;
  }
  console.log("pool connected on" + pool.user);
});

module.exports = { pool };
