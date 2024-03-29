DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db; 

--the three tables needed for data

CREATE TABLE department(
    id INT not null auto_increment,
    name VARCHAR(30),
    PRIMARY KEY (id)
);


CREATE TABLE roles(
    id INT not null auto_increment,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT not null,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);


CREATE TABLE employees (
 id int not null auto_increment,
 first_name VARCHAR(30),
 last_name VARCHAR(30),
 role_id INT not null,
 manager_id INT, 
 PRIMARY KEY (id),
 FOREIGN KEY (role_id) REFERENCES roles(id)
);