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
  


function showTable(data, cb){
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

dbData = [
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