DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db; 


CREATE TABLE employees (
 id int not null auto_increment,
 first_name VARCHAR(30),
 last_name VARCHAR(30),
 manager_id INT not null, 
 role_id INT not null,
 PRIMARY KEY (id),
 FOREIGN KEY (role_id) REFERENCES roles(id)
)

