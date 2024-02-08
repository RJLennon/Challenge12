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

