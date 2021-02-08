CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
id INT PRIMARY KEY,
department_name VARCHAR(30)
);

CREATE TABLE  employee_role(
id INT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL(5,2),
department_id INT
);

CREATE TABLE employees(
id INT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT
);