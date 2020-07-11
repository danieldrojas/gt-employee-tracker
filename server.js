//=================================
//Require all functions needed
//=================================
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");


//=================================
// Basic connection setup
//=================================
// create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Familiar1410.",
    database: "employeeDB"
});

//=====================================
//Prompt Questions
//=====================================
const mainPrompt = {

    name: "mainOptions",
    type: "list",
    message: "What would you like to do?",
    choices: ["Add Employee", "View All Employees", "View All Department", "View All Roles","Remove Employee", "Update Employee Role", "Update Employee Manager", "Add Role", "Add Department","Update Employee Roles","EXIT"]

}



//Connection to the database
connection.connect(function (err, res) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId + "\n");



    start();
 
});

function start() {
    inquirer
        .prompt(mainPrompt)
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            switch (answer.mainOptions) {
                case "Add Employee":
                   return addEmployee();
                    break;
                case "View All Employees":
                   return viewAllEmployees();
                    break;
                case "View All Employees":
                    return viewAllEmployees();
                    break;
                case "Add Department":
                    return addDepartment();
                    break;
                case "View All Department":
                    return viewAllDepartment();
                    break;
                case "View All Roles":
                    return viewAllRoles();
                    break;
                case "Add Role":
                    return addRole();
                    break;
                case "Update Employee Role":
                    return updateEmployeeRole();
                    break;
                default:
                    connection.end();
            }
            
        });
  
}

//=======================================
// Functionality 
//=======================================
//Add a new employee to database
function addEmployee() {
    

    connection.query("SELECT * FROM role", function (err, data) {
        var roleTitles = [];
        for (var i = 0; i < data.length; i++){
            roleTitles.push(data[i].title)
            
        }

        const addEmployeePrompt = [{

            name: "firstName",
            type: "input",
            message: "Enter employee first name?",

        },
        {
            name: "lastName",
            type: "input",
            message: "Enter employee last name?",

        },
        {
            name: "roleId",
            type: "list",
            message: "Pick a role?",
            choices: roleTitles

        },
      
        ]


    inquirer
        .prompt(addEmployeePrompt)
        .then(function (answer) {
            
            var roleId;

            for (var i = 0; i < data.length; i++) {
                if (answer.roleId === data[i].title) {
                    roleId = data[i].id;
                }
            }
            connection.end
            
       
        });
    })
}

function addDepartment() {
    inquirer.prompt({
        type: "input",
        name: "addDepartment",
        message: "Enter a name for the department?"
    }).then(function (answer) {

        connection.query("INSERT INTO department SET ?",

            {
                name: answer.addDepartment
            },
            function (err) {
                if (err) throw err;
            

            });
    });
};
function addRole() {

    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        const departmentNames = [];
        for (let i = 0; i < res.length; i++) {
            departmentNames.push(res[i].name);
        };
    
        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "Enter a role?"
            },
            {
                type: "input",
                name: "salary",
                message: "Enter salary?"
        
            },
            {
                type: "list",
                name: "departments",
                message: "Choose a department",
                choices: departmentNames

            }]).then(function (answer) {

                var departmentId;

                for (var i = 0; i < res.length; i++){
                    if (answer.departments === res[i].name) {
                        departmentId = res[i].id;
                    }
                }


                connection.query("INSERT INTO role SET ?",

                    {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: departmentId
                    },
                    function (err) {
                        if (err) throw err;


                    });
            });
    });
    
}

function viewAllDepartment() {
  

    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err;
        console.table(data)
        connection.end();
    })

}
function viewAllRoles(tables) {


    connection.query("SELECT * FROM role", function (err, data) {
        if (err) throw err;
        connection.end();
    })

}

function viewAllEmployees() {



    connection.query("SELECT * FROM employee", function (err, data) {
        if (err) throw err;
        console.table(data)
        connection.end();
    })

}

function updateEmployeeRole() {
   


    connection.query("SELECT DISTINCT employee.id, first_name, last_name, title, role_id FROM employee LEFT JOIN role on employee.id = role.id;", function (err, data) {
        if (err) throw err;

        var arrayEmployees = [];
        for (let i = 0; i < data.length; i++){
            arrayEmployees.push(data[i].first_name + " " + data[i].last_name)
        }

       

        inquirer.prompt([
            {
                name: "update",
                type: "list",
                message: "Choose an employee from the list?",
                choices: arrayEmployees
                
            },
           

        ]).then(function (answer) {


            connection.query("SELECT * FROM role", function (err, data) {
                if (err) throw err;



                const arrayRoles = [];
                for (let i = 0; i < data.length; i++) {
                    arrayRoles.push(data[i].title)

                };

                // inquirer.prompt({

                //     name: "roles",
                //     type: "list",
                //     message: "Choose new role?",
                //     choices: arrayRoles

                // }).then(function (answer) {
                  
                //     connection.query("UPDATE INTO role SET ? WHERE  ?",
                //         {
                //             title: answer.roles
                //         },
                //         {
                //             id: data.id

                //         }, function (err) {
                //         if (err) throw err;
                        
                //     })



                // })









            })
      




            
           


            
        })





    })
    
    // connection.query("SELECT  first_name, last_name, role_id FROM employee", function (err, data) {
    //     console.log(data);

    //     console.table(data)
        
        
    // })



}














//test function  
function tableData(tableName) {
    connection.query(
        "SELECT * FROM " + tableName,
        function (err, data) {
            console.log("this is the current data base")
            console.table(data)

            connection.end();

        }

    )
}






