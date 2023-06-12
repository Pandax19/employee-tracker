const inquirer = require('inquirer');
const { table }  = require('table');

const config = {
    border: {
      topBody: `─`,
      topJoin: `┬`,
      topLeft: `┌`,
      topRight: `┐`,
  
      bottomBody: `─`,
      bottomJoin: `┴`,
      bottomLeft: `└`,
      bottomRight: `┘`,
  
      bodyLeft: `│`,
      bodyRight: `│`,
      bodyJoin: `│`,
  
      joinBody: `─`,
      joinLeft: `├`,
      joinRight: `┤`,
      joinJoin: `┼`
    }
  };
  


 async function showTable(data, cb){
    let tableData = [];
    tableData =[

        Object.keys(data[0]),
        ...data.map(val => Object.values(val))];
    
    inquirer.prompt([
        {
            message: '\n' + table(tableData, config),
            type: 'input',
            name: 'name'
        }
         ])
        .then( () => {
            if(cb) cb();
        })

}


const answers = await inquirer.prompt([
	{
	 message: "/n" + table(tableData, config),
	 type: 'input',
	 name: 'name'
	}
 ]);



 const dbData = [
    {id: 1, name: "x"},
    {id: 2, name: "x"},
    {id: 3, name: "x"},
    {id: 4, name: "x"},
    {id: 5, name: "x"},
];

// tableData =  [Object.keys(data[0]), ...test.map(val => Object.values(val))];


showTable(dbData, () => {
    console.log("do stuff");
});

const addCourse = async function() {
	console.log("test");
    SELECT * FROM **instrutors**
	await showTable(realData)
 };

const menu = async function () {
	
	const answers = await inquirer.prompt([
	{
	 message: "what do you want to do?",
	 type: "list",
	 name: 'option',
	 choices: [
	   "view all departments", "view all roles","view all employees", "add a department", "add a role", "add an employee", "update an employee role" ],
	}
])};

if(answers.option === "view all departments"){
 viewAll();

 };


const init = async function(){


	await showTable(dbData); 
	await menu();
}

init();


