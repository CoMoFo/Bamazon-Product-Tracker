-- 1. Create a MySQL Database called `bamazon`.
CREATE DATABASE bamazon;
USE bamazon;
-- 2. Then create a Table inside of that database called `products`.
CREATE TABLE products(

item_id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100),
department_name VARCHAR(100),
price DECIMAL (10,2),
stock_quantity INTEGER,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dune","Books",55.55,100),("Neuromancer","Books",66.99,150),("Playstation","Electronics",300.99,50),("Xbox","Electronics",449.99,300),("Teapot", "Homegoods",29.99,350),("Pots","Homegoods",4.19,420),("Chairs","Homegoods",39.99,100),("Tables","Homegoods",249.99,50),("Bowls","Homegoods",19.99,199),("Knives","Homegoods",9.99,600);
-- 3. The products table should have each of the following columns:

--    * item_id (unique id for each product)

--    * product_name (Name of product)

--    * department_name

--    * price (cost to customer)

--    * stock_quantity (how much of the product is available in stores)

-- 4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).