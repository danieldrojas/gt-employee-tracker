//=================================
//Require all functions needeed
//=================================
const mysql = require("mysql");
const inquirer = require("inquirer");


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
    type: "input",
    message: "Enter role ID number?",

},
{
    name: "managerId",
    type: "input",
    message: "Enter manager ID number?",

}

]



//Connection to the database
connection.connect(function (err, res) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId + "\n");
    console.log("This is just an obj of the actually connection the response from the query connection")
    console.log("=======================================");
    console.log(res)

    start();
 
});

function start() {
    inquirer
        .prompt({

                name: "mainOptions",
                type: "list",
                message: "What would you like to do?",
            choices: ["Add  Employee", "View All Employees", "Remove Employee", "Update Employee Role", "Update Employee Manager", "EXIT"]
            
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions

            switch (answer) {
                case "Add Employee":
                    addEmployee();
                    break;
                case "View All Employees":
                    addEmployee();
                    break;
                default:
                    addEmployee();
      }
            
        });
  
}

function addEmployee() {
    console.log("you chose to add employee!");

    inquirer
        .prompt(addEmployeePrompt)
        .then(function (answer) {
            
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.roleId,
                    manager_id: answer.managerId
                },
       
                function (err) {
                    if (err) throw err;
                    console.log("Employee added")
                    tableData("employee");

                });
            
            
       
        });
}


















  
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






