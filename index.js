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
        db.query('SELECT a.id,a.first_name,a.last_name,roles.title,department.department_name,roles.salary,CONCAT(b.first_name," ",b.last_name) AS "manager_name" FROM employee AS a LEFT JOIN roles ON role_id = roles.id LEFT JOIN department ON department_id = department.id LEFT JOIN employee AS b ON a.manager_id = b.id ORDER BY a.id ASC', function (err, results) {
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
      case addDepartment:
        inquirer
          .prompt([
            {
              type: 'input',
              message: 'Enter the name of a department',
              name: 'newDepartment',
            },
          ])
          .then((response) => {
            db.query('INSERT INTO department (department_name) VALUES (?)',[response.newDepartment],function (err, results) {
              if (err) {
                console.error('Error adding department', err);
                return;
              }
              console.log('New department added!');
            })
            mainMenu();
          });
      break;
      case addRole:
        //Query to return all departments for inquier prompt
        db.query('SELECT * FROM department',function (err,results) {
          if (err) {
            console.error('Error fetching departments',err);
            return;
          }
          const allDepartments = results.map((row)=>{
            return {
              name: row.department_name,
              value: row.id
            };
          });
        //inquirer prompt to get new role info
          inquirer
          .prompt([
            {
              type: 'input',
              message: 'Enter the name of the role',
              name: 'newRole',
            },
            {
              type: 'input',
              message: 'Enter the salary',
              name: 'newSalary',
            },
            {
              type: 'list',
              message: 'Select a department',
              choices: allDepartments,
              name: 'roleDepartment',
            }
          ])
          .then((response) => {
            //insert responses into db
            db.query('INSERT INTO roles (title,salary,department_id) VALUES (?,?,?)',
            [response.newRole,response.newSalary,response.roleDepartment],
            function (err, results) {
              if (err) {
                console.error('Error adding role', err);
                return;
              }
              console.log('New role added!');
              mainMenu();
            })
          });
        });
      break;
      case addEmployee:
        //Query to return all roles for inquirer prompt
        db.query('SELECT * FROM roles',function (err,results) {
          if (err) {
            console.error('Error fetching roles',err);
            return;
          }
          const allRoles = results.map((row)=>{
            return {
              name: row.title,
              value: row.id
            };
          });
        //Query to return all employee names for inquirer prompt
        db.query('SELECT employee.id, CONCAT(first_name," ",last_name) AS "manager_name" FROM employee',function (err,results) {
          if (err) {
            console.error('Error fetching roles',err);
            return;
          }
          const allManagers = results.map((row)=>{
            return {
              name: row.manager_name,
              value: row.id
            };
          });
          //inquirer prompt to get new employee info
          inquirer
          .prompt([
            {
              type: 'input',
              message: 'Enter the employee first name',
              name: 'newFirstName',
            },
            {
              type: 'input',
              message: 'Enter the employee last name',
              name: 'newLastName',
            },
            {
              type: 'list',
              message: 'Select a role',
              choices: allRoles,
              name: 'employeeRole',
            },
            {
              type: 'list',
              message: 'Select a manager',
              choices: allManagers,
              name: 'employeeManager',
            }
          ])
          .then((response) => {
            //insert responses into db
            db.query('INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)',[response.newFirstName,response.newLastName,response.employeeRole,response.employeeManager],function (err, results) {
              if (err) {
                console.error('Error adding employee', err);
                return;
              }
              console.log('New employee added!');
              mainMenu();
            })
          });
        });
      });
      break;
      case updateEmployee:
        //Query to return all roles for inquirer prompt
        db.query('SELECT * FROM roles',function (err,results) {
          if (err) {
            console.error('Error fetching roles',err);
            return;
          }
          const allRoles = results.map((row)=>{
            return {
              name: row.title,
              value: row.id
            };
          });
        //Query to return all employee names for inquirer prompt
        db.query('SELECT employee.id, CONCAT(first_name," ",last_name) AS "employee_name" FROM employee',function (err,results) {
          if (err) {
            console.error('Error fetching roles',err);
            return;
          }
          const allEmployees = results.map((row)=>{
            return {
              name: row.employee_name,
              value: row.id
            };
          });
          //inquirer prompt to get new employee info
          inquirer
          .prompt([
            {
              type: 'list',
              message: 'Select an employee',
              choices: allEmployees,
              name: 'employeeName',
            },
            {
              type: 'list',
              message: 'Select a role',
              choices: allRoles,
              name: 'employeeRole',
            }
          ])
          .then((response) => {
            //update responses into db
            db.query('UPDATE employee SET role_id = ? WHERE id = ?',[response.employeeRole,response.employeeName],function (err, results) {
              if (err) {
                console.error('Error updating employee', err);
                return;
              }
              console.log('Employee role updated!');
              mainMenu();
            })
          });
        });
      });
      break;
      };
  });
  return;
};

employeeTracker();