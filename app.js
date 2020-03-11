const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

var myArray = [];

promptUser();

async function promptUser() {
  var answers = await inquirer.prompt([
    {
      type: "list",
      choices: ["Manager", "Engineer", "Intern"],
      name: "role",
      message: "Choice new entries role"
    },
    {
      type: "input",
      name: "name",
      message: "Enter a name."
    },
    {
      type: "input",
      name: "email",
      message: "Enter Email"
    },
    {
      type: "input",
      name: "id",
      message: "Assign a new id"
    }
  ]);

  switch (answers.role) {
    case "Manager":
      var answers2 = await inquirer.prompt({
        type: "input",
        name: "officeNumber",
        message: "Enter office number"
      });
      var employee = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers2.officeNumber
      );
      break;
    case "Engineer":
      var answers2 = await inquirer.prompt({
        type: "input",
        name: "username",
        message: "Enter Github username"
      });
      var employee = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers2.username
      );
      break;
    case "Intern":
      var answers2 = await inquirer.prompt({
        type: "input",
        name: "school",
        message: "Enter intern's school"
      });
      var employee = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers2.school
      );
      break;
  }
  myArray.push(employee);

  var additionalEmployee = await inquirer.prompt({
    name: "confirm",
    type: "list",
    choices: ["Yes", "No"],
    message: "Do you wish to create an additional employee?"
  });

  var htmlData = render(myArray);
  fs.writeFile("output.html", htmlData, function(err) {
    if (!err) console.log("Data written to output.html");
  });

  if (additionalEmployee.confirm == "Yes") {
    promptUser();
  }
}
