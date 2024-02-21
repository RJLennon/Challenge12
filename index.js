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

//Create function for continuing 
//Create Menu Choices
const newMenu = "Return to main menu";
const quitApplication = "Quit";

async function mainMenu() {
  const response = await inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        newMenu,
        quitApplication,
      ],
      name: 'test',
    },
  ]);

  if (response.test === newMenu) {
    employeeTracker();
  } else {
    process.exit(0);
  }
};

//Create Employee Tracker Menu Choices
const viewDepartments = "View All Departments";
const viewRoles = "View All Roles";
const viewEmployees = "View All Employees";
const addDepartment = "Add a Department";
const addRole = "Add a Role";
const addEmployee = "Add an Employee";
const updateEmployee = "Update an Employee Role";

//Employee Tracker 
function employeeTracker() {
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
          mainMenu();
        });
      break;
      case viewRoles:
        db.query('SELECT roles.id,title,salary,department.department_name FROM roles LEFT JOIN department ON department_id = department.id', function (err, results) {
          if (err) {
            console.error('Error fetching roles', err);
            return;
          }
          console.log("");
          console.table(results);
          console.log("");
          mainMenu();
        });
      break;
      case viewEmployees:
        db.query('SELECT employee.id,first_name,last_name,roles.title,department.department_name,roles.salary FROM employee LEFT JOIN roles ON role_id = roles.id LEFT JOIN department ON department_id = department.id ', function (err, results) {
          if (err) {
            console.error('Error fetching roles', err);
            return;
          }
          console.log("");
          console.table(results);
          console.log("");
          mainMenu();
        });
      break;
      };
  });
  return;
};

employeeTracker();