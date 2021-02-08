//-------------------------------------------//
const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Tyler4030285',
    database : 'employee_db'
  });
//------------------------------------------//
//-----establish connection with MySQL-----//
connection.connect(function(err){
    if (err) {
        console.log('error conntecting: '+ err.stack);
        return;
    }
    console.log('connected as ID: '+connection.threadId);
});



