## Creating a Database

- Using the psql console, create a new database named “company_records”.

```
create database company_records
```

- Create a new user named “db_user” with a password of your choice and grant all privileges on the “company_records” database to this user.

```
CREATE ROLE db_user WITH SUPERUSER CREATEDB CREATEROLE LOGIN ENCRYPTED PASSWORD '135256';
```

## Designing a Database Schem

- Design a simple schema for managing employee records. Consider entities like Employees, Departments, and Salaries.

- Utilize an online schema design tool like dbdiagram.io to visualize and finalize your schema.

```
Table employee {
  employee_id integer [primary key]
  name varchar
  department_id integer 
  salary_id integer
}

Table departments {
  department_id integer [primary key]
  name varchar
}

Table salaries {
  salary_id integer [primary key]
  amount integer
}

Ref: employee.salary_id > salaries.salary_id

Ref: departments.department_id < employee.department_id
```

- Write the SQL commands for creating the tables based on your schema design and check them into your Git project.

## Creating Tables

- Based on your schema design, write SQL scripts to create tables for Employees, Departments, and Salaries in the “company_records” database.

- Ensure appropriate data types, primary keys, and constraints are applied.

```
CREATE TABLE Departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(255)
);

CREATE TABLE Salaries (
    salary_id INT PRIMARY KEY,
    amount INT
);

CREATE TABLE Employees (employee_id INT PRIMARY KEY,
    name VARCHAR(255), department_id INT,
    salary_id INT,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id),
    FOREIGN KEY (salary_id) REFERENCES Salaries(salary_id)
);
```

## Inserting Data

- Populate the tables with sample data. Include at least 5 employees, 3 departments, and corresponding salary information.

- Use INSERT INTO statements to add data to the tables.

```
INSERT INTO Departments (department_id, department_name) VALUES
(1, 'Human Resources'),
(2, 'Marketing'),
(3, 'Finance');

INSERT INTO Salaries (salary_id, amount) VALUES 
(1, 50000.00), 
(2, 60000.00), 
(3, 80000.00);

INSERT INTO Employees (employee_id, name, department_id, salary_id) VALUES
(1, 'ep1', 1, 1),
(2, 'ep2', 2, 1),
(3, 'ep3', 1, 2),
(4, 'ep4', 2, 2),
(5, 'ep5', 3, 3);
```

## Basic SQL Queries

- Write SQL queries to demonstrate the following:
    - Selecting all employees from the Employees table.
    - Selecting employees based on their department ID.
    - Selecting employees with a salary greater than a specified amount.
    - Deleting an employee record based on their employee ID.

```
select * from Employees;

select * from Employees where department_id = 1;

SELECT *
FROM Employees
WHERE salary_id IN (
    SELECT salary_id
    FROM Salaries
    WHERE amount > 60000.00);

DELETE FROM Employees WHERE employee_id = 1;
```

## Intermediate SQL Queries

- Explore JOIN operations to retrieve information from multiple tables. Write queries to:
    - Retrieve employee details along with their department information.
    - Calculate the total salary expenditure for each department.
    - Find the average salary of employees in the company.

```
SELECT Employees.*, Departments.department_name
FROM Employees
JOIN Departments ON Employees.department_id = Departments.department_id;

SELECT Departments.department_id, Departments.department_name, SUM(Salaries.amount) AS total_salary_expenditure
FROM Employees
JOIN Departments ON Employees.department_id = Departments.department_id
JOIN Salaries ON Employees.salary_id = Salaries.salary_id
GROUP BY Departments.department_id, Departments.department_name;

SELECT AVG(amount) AS average_salary
FROM Salaries;
```

## Migrations

- Create a SQL migration script to add a new column “Hire_Date” to the Employees table.

```
ALTER TABLE Employees
ADD Hire_Date DATE;
```

- Apply the migration script to update the schema accordingly.
- Ensure that existing data is preserved during the migration process.

```
CREATE TABLE Employees_backup AS SELECT * FROM Employees;

DROP TABLE Employees_backup;
```