USE employeeDB;

--======================================
-- Seeds for DEPARTMENT table
--======================================
INSERT INTO department (name)
VALUE ("Daniel");
INSERT INTO department (name)
VALUE ("John");
INSERT INTO department (name)
VALUE ("Peter");
INSERT INTO department (name)
VALUE ("Summer");

--======================================
-- Seeds for ROLE table
--======================================
INSERT INTO role (title, salary, department_id)
VALUE ("Engineer", 100000, 3), ("manager", 150000, 3);

--======================================
-- Seeds for EMPLOYEE table
--======================================
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Daniel", "Rojas", 3, 5), ("Peter", "Smith", 2, 5);