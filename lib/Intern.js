const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id, email) {
    this.school = school;
    this.role = "Intern";
    this.id = id;
  }
  getSchool() {
    return this.school;
  }
}

module.exports = Employee;
