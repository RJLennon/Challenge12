//import mysql and inquirer
const inquirer = require('inquirer');
const mysql = require('mysql2');

//Create Datebase connection
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 8889,
    database: 'employee_db'
  },
  console.log(`Connected to the database.`)
);

//Create Menu Choices
const viewDepartments = "View All Departments";
const viewRoles = "View All Roles";
const viewEmployees = "View All Employees";
const addDepartment = "Add a Department";
const addRole = "Add a Role";
const addEmployee = "Add an Employee";
const updateEmployee = "Update an Employee Role";

function mainMenu() {
  inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        viewDepartments,
        viewRoles,
        viewEmployees,
        addDepartment,
        addRole,
        addEmployee,
        updateEmployee,
      ],
      name: 'menu',
    },
  ])
  .then((response) => {
    switch(response.menu) {
      case viewDepartments:
        db.query('SELECT * FROM department', function (err, results) {
          if (err) {
            console.error('Error fetching departments', err);
            return;
          }
          console.log("");
          console.table(results);
          console.log("");
        });
      break;
      };
  });
  return;
};

mainMenu();