USE  employee_db;

INSERT INTO department (department_name)
VALUES  ("Legal"),
	("Engineering"),
        ("Sales"),
        ("Maintenance"),
        ("Finance");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Lawyer",150000,1),
        ("Lead Counsil",200000,1),
        ("Staff Engineer",100000,2),
        ("Chief Engineer",150000,2),
        ("Salesperson",75000,3),
        ("Sales Lead",100000,3),
        ("Maintenance Technician",60000,4),
        ("Maintenance Supervisor",100000,4),
        ("Accountant",80000,5),
        ("Senior Accountant",100000,5),
        ("Controller",180000,5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John","Doe",3,NULL),
        ("Jane","Doe",1,1),
        ("Clark","Kent",2,1),
        ("Barry","Allen",4,NULL),
        ("Bruce","Wayne",3,4),
        ("Peter","Parker",11,NULL),
        ("Bruce","Banner",10,6);

SELECT * FROM department