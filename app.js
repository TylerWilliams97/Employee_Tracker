//-------------------------------------------------------//
const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'employee_db'
  });

//-------------------------------------------------------//
//-----start function to start asking for user input-----//
const start = () => {
    console.log("==========Employee-Tracker==========");
    inquirer.
        prompt({
            name:"start",
            type:"list",
            message:'add, view, or update your database!',
            choices:["add",'view','update','stop']
        }).then((Response) => {
            if(Response.start === 'add'){
                //console.log("choice add");
                add();
            }
            else if(Response.start === 'view'){
                //console.log('choice view');
                view();
            }
            else if(Response.start === 'update'){
                //console.log('choice update');
                update();
            }
            else if(Response.start === 'stop'){
                //console.log('choice stop');
                connection.end();
            }
        });
        

};
//---------------------------------------------------------//
//------------function to return to the start--------------//
const startreturn = () => {
    inquirer.
        prompt({
            name:'startagain',
            type:'list',
            message:'return to start?',
            choices:['YES','END']
        }).then((answer) =>{
            if(answer.startagain === 'YES'){
                start();
            }
            else{
                connection.end()
            }
        })
};
//---------------------------------------------------------//
//-----Function for choosing which add function to use-----//
const add = () => {
    inquirer.   
        prompt({
            name:'additionchoice',
            type:'list',
            message:'what would you like to add?',
            choices:['department','role','employee']
        }).then((answer) => {
            if(answer.additionchoice === 'department'){
                console.log('add department');
                addDepartment();
            }
            else if(answer.additionchoice === 'role'){
                console.log('add role');
                addRole();
            }
            else if(answer.additionchoice === 'employee'){
                console.log('add employee');
                addEmployee();
            }
        })
};
//-----------------------------------------------------------//
//----------functions for addition user input----------------//
//-----DEPARTMENT-----//
const addDepartment = () => {
    inquirer.
        prompt([{
            name:'department_id',
            type:'input',
            message:'what is the department id?'
        },
        {
            name:'department_name',
            type:'input',
            message:'what is the name of the department?'
        }]).then((answers) => {
            connection.query(`INSERT INTO department (department_id,department_name) VALUES (${answers.department_id},"${answers.department_name}")`,(err) =>{
                if(err){console.log(err); startreturn();}
                else{console.log('info added to DB!');
                     startreturn(); }
            
        })
})};
//-----ROLE-----//
const addRole = () => {
    inquirer.
        prompt([{
            name:'role_id',
            type:'input',
            message:'what is the role id?'
        },
        {
            name:'title',
            type:'input',
            message:'what is the title of the role?'
        },
        {
            name:'salary',
            type:'input',
            message:'what is the salary of this position?'
        },
        {
            name:'department_id',
            type:'input',
            message:'what is the department id?'
        }
    ]).then((answers) => {
        connection.query(`INSERT INTO employee_role (role_id,title,salary,department_id) VALUES (${answers.role_id},'${answers.title}',${answers.salary},${answers.department_id})`,(err) =>{
            if(err){console.log(err)}
            else{console.log('info added to DB!');
                 startreturn(); }
        
    })
    })
};
//----- EMPLOYEE-----//
const addEmployee = () => {
    inquirer.
        prompt([{
            name:'id',
            type:'input',
            message:'enter employee id?'
        },
        {
            name:'first_name',
            type:'input',
            message:'employees first name'
        },
        {
            name:'last_name',
            type:'input',
            message:'employees last name'
        },
        {
            name:'role_id',
            type:'input',
            message:'employees role id'
        },
        {
            name:'manager_id',
            type:'input',
            message:'enter employees managers id'
        }]).then((answers) => {
            connection.query(`INSERT INTO employees (id,first_name,last_name,role_id,manager_id) VALUES (${answers.id},'${answers.first_name}','${answers.last_name}',${answers.role_id},${answers.manager_id})`,(err) =>{
                if(err){console.log(err)}
                else{console.log('info added to DB!');
                     startreturn(); }
            
        })
        })
};
//---------------------------------------------------//
//-------------function to view tables----------------//
const view = () => {
    inquirer.
        prompt({
            name:"viewdata",
            type:"list",
            message:'choose a database to view!',
            choices:["departments",'roles','employees','return']
        }).then((answer)=>{
            if(answer.viewdata === "departments"){
                connection.query('SELECT * FROM department',(err,res)=>{
                    if(err){
                        console.log(err);
                          view()}
                  
                 else console.table(res);
                  startreturn();
              })
            }
            else if(answer.viewdata === "roles"){
                connection.query('SELECT * FROM employee_role',(err,res)=>{
                    if(err){
                        console.log(err);
                          view()}
                  
                 else console.table(res);
                 startreturn();
              })
            }
            else if(answer.viewdata === "employees"){
                connection.query('SELECT * FROM employees',(err,res)=>{
                    if(err){
                        console.log(err);
                          view()}
                  
                 else console.table(res);
                 startreturn();
              }) 
            }
            else{startreturn()}
        })
    
    };
//-----------------------------------------------------//
//-----------function to delete from tables------------------//
const update = () =>{
    inquirer.
        prompt({
            name:"delete",
            type:"list",
            message:'choose a database to delete from!',
            choices:["departments",'roles','employees','return']
        }).then((answer)=>{
            if(answer.delete === "departments"){
                inquirer.
                prompt({
                    name:'id',
                    type:'input',
                    message:'input id of department you would like to delete'

                }).then((answers) => {
                    connection.query(`DELETE FROM department WHERE department_id=${answers.id}`,(err,res)=>{
                        if(err){
                            console.log(err);
                              view()}
                      
                     else console.log('entry deleted');
                     startreturn();
                  }) 
                })
            }
            else if(answer.delete === "roles"){
                inquirer.
                prompt({
                    name:'id',
                    type:'input',
                    message:'input id of role you would like to delete'

                }).then((answers) => {
                    connection.query(`DELETE FROM employee_role WHERE role_id=${answers.id}`,(err,res)=>{
                        if(err){
                            console.log(err);
                              view()}
                      
                     else console.log('entry deleted');
                     startreturn();
                  }) 
                })
            }
            else if(answer.delete === "employees"){
                inquirer.
                    prompt({
                        name:'id',
                        type:'input',
                        message:'input id of employee you would like to delete'

                    }).then((answers) => {
                        connection.query(`DELETE FROM employees WHERE id=${answers.id}`,(err,res)=>{
                            if(err){
                                console.log(err);
                                  view()}
                          
                         else console.log('entry deleted');
                         startreturn();
                      }) 
                    })           
        }
    }

)};





































//-----establish connection with MySQL-----//
connection.connect(function(err){
    if (err) {
        console.log('error conntecting: '+ err.stack);
        return;
    }
    console.log('connected as ID: '+connection.threadId);
    start();
});
 //-----------------------------------------//


 


