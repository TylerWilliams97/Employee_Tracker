CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
department_id INT PRIMARY KEY,
department_name VARCHAR(30)
);

CREATE TABLE  employee_role(
role_id INT PRIMARY KEY,
title VARCHAR(30),
salary INT,
department_id INT
);

CREATE TABLE employees(
id INT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT
);


INSERT INTO department (department_id,department_name) VALUES (${answers.department_id},${answers.department_name});

INSERT INTO employee_role (role_id,title,salary,department_id) VALUES (${answers.role_id},'${answers.title}',${answers.salary},${answers.department_id});

INSERT INTO employees (id,first_name,last_name,role_id,manager_id) VALUES (${answers.id},'${answers.first_name}','${answers.last_name}',${answers.role_id},${answers.manager_id});

DELETE FROM department WHERE department_id=${answers.id};

DELETE FROM employee_role WHERE role_id=${answers.id};

DELETE FROM employees WHERE id=${answers.id};
