const inquirer = require("inquirer");
const { table } = require("table");
const mysql = require("mysql2/promise");
// adding all of the packages needed to run 

//creating connection to the database
(async function () {
  try {
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "mypassword666",
      database: "employee_db",
    });

    console.log(`Connected to the employee_db database.`);

    const config = {
      border: {
        topBody: "─",
        topJoin: "┬",
        topLeft: "┌",
        topRight: "┐",
        bottomBody: "─",
        bottomJoin: "┴",
        bottomLeft: "└",
        bottomRight: "┘",
        bodyLeft: "│",
        bodyRight: "│",
        bodyJoin: "│",
        joinBody: "─",
        joinLeft: "├",
        joinRight: "┤",
        joinJoin: "┼",
      },
    };


    // putting the data into the table and displaying it
    async function showTable(data, cb) {
      let tableData = [
        Object.keys(data[0]),
        ...data.map((val) => Object.values(val)),
      ];

      console.log("\n" + table(tableData, config));

      if (cb) cb();
    }

    const viewAll = async function () {
      const [rows] = await db.query(`SELECT t1.id, t1.first_name, t1.last_name, t2.title, t3.name, t2.salary,
        if(t1.manager_id IS NOT NUll, ( t4.last_name ), NULL) AS "manager"
        FROM employees t1
        LEFT JOIN roles t2
        ON t2.id = t1.role_id
        LEFT JOIN department t3 
        ON t3.id = t2.department_id
        LEFT JOIN employees t4
        ON t4.id = t1.manager_id
        ORDER BY t1.id;`);
      const dbData = rows;
      await showTable(dbData, menu );
    };

    const options = [
      {
        message: "What do you want to do?",
        type: "list",
        name: "option",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add department",
          "Add role",
          "Add employee",
          "Update employee role",
        ],
      },
    ];

    //pulling up functions to select data
    function menu() {
      inquirer.prompt(options).then((data) => {
        switch (data.option) {
          case "View all departments":
            viewDepartments();
            break;
          case "View all employees":
            viewEmployees();
            break;
          case "View all roles":
            viewRoles();
            break;
          case "Add department":
            addDepartment();
            break;
          case "Add role":
            addRole();
            break;
          case "Add employee":
            addEmployee();
            break;
          case "Update employee role":
            updateEmployee();
            break;
        }
      });
    }

        //function for viewing departments
    async function viewDepartments() {
      const [rows] = await db.query(`SELECT * FROM department;`);
      console.table(rows);
      menu();
    }
    //function for viewing employees
    async function viewEmployees() {
      const [rows] = await db.query(`SELECT * FROM employees;`);
      console.table(rows);
      menu();
    }
    //function for viewing roles
    async function viewRoles() {
      const [rows] = await db.query(`SELECT * FROM roles;`);
      console.table(rows);
      menu();
    }
    //function for adding department
    async function addDepartment() {
      try {
        const answer = await inquirer.prompt([
          {
            type: "input",
            message: "Name of the department:",
            name: "deptName",
          },
        ]);

        const deptName = answer.deptName;

        await db.query(`INSERT INTO department (name) VALUES (?);`, deptName);
        console.log("Department added successfully!");
        menu();
      } catch (error) {
        console.error(error);
      }
    }

    function addEmployee() {
        inquirer
          .prompt([
            {
              type: "input",
              message: "Employee first name:",
              name: "firstName",
            },
            {
              type: "input",
              message: "Employee last name:",
              name: "lastName",
            },
            {
              type: "input",
              message: "Employee role ID:",
              name: "roleID",
            },
            {
              type: "list",
              message: "Employee's manager ID:",
              name: "managerID",
              choices: [1, 3, 5, 7],
            },
          ])
          .then((data) => {
            db.query(
              `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`,
              [data.firstName, data.lastName, data.roleID, data.managerID]
            )
              .then(() => {
                console.log("Employee added successfully!");
                menu();
              })
              .catch((err) => {
                console.log(err);
              });
          });
      
        };
    

    function addRole() {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the new role?",
              name: "role",
            },
            {
              type: "input",
              message: "What is the salary?",
              name: "salary",
            },
            {
              type: "input",
              message: "What department?",
              name: "departmentId",
            },
          ])
          .then((data) => {
            db.query(
              `INSERT INTO roles (department_id, title, salary) VALUES (?, ?, ?);`,
              [data.departmentId, data.role, data.salary]
            )
              .then(() => {
                console.log("Role added successfully!");
                menu();
              })
              .catch((err) => {
                console.log(err);
              });
          });
      }

    function updateEmployee() {
      db.query(`SELECT id, first_name, last_name FROM employees`)
        .then(([employeeRows]) => {
          const employeeList = employeeRows.map((row) => ({
            name: `${row.first_name} ${row.last_name}`,
            value: row.id,
          }));

          return db.query("SELECT id, title FROM roles;").then(([roleRows]) => {
            const roleList = roleRows.map((row) => ({
              name: row.title,
              value: row.id,
            }));

            return inquirer.prompt([
              {
                type: "list",
                message: "Select an employee:",
                name: "employeeID",
                choices: employeeList,
              },
              {
                type: "list",
                message: "Select a new role:",
                name: "roleID",
                choices: roleList,
              },
            ]);
          });
        })
        .then((data) => {
          return db.query(
            `UPDATE employees SET role_id = ? WHERE id = ?;`,
            [data.roleID, data.employeeID]
          );
        })
        .then(() => {
          console.log("Employee role updated successfully!");
          menu();
        })
        .catch((error) => {
          console.error(error);
        });
    }

    await viewAll();
    
  } catch (error) {
    console.error(error);
  }
})();