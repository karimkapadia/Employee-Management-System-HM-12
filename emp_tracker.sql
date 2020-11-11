Create database emp_tracker;
use emp_tracker; 

create table department(
    `id`  INT PRIMARY KEY,
    `name` VARCHAR(30)); 

create table emp_role(
  `id`  INT PRIMARY KEY,
  `title` VARCHAR(30), 
  `salary`   DECIMAL ,
  `department_id` INT);

create table employee(
  `id` INT PRIMARY KEY,
  `first_name` VARCHAR(30),
  `last_name` VARCHAR(30),
  `role_id` INT, 
  `manager_id` INT);
  insert into department values(001, "science");
  select * from department;
INSERT INTO department (id, name) VALUES (1,"Software Testing");
INSERT INTO emp_role (id, title, salary, department_id) VALUES (1,"Software Engineer", 80000, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (1,"Sajal","Karkee",1,2);