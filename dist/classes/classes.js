"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    describe() {
        console.log("Department: " + this.name);
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, 'IT');
        this.admins = admins;
    }
    addEmployee(name) {
        if (name === 'nico')
            return;
        this.employees.push(name);
    }
}
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, 'Accounting');
        this.reports = reports;
        this.lastReport = reports[0];
    }
    get getMostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        return "No reports found...";
    }
    set setMostRecentReport(value) {
        if (!value) {
            throw new Error("Please enter a valid value");
        }
        this.addReport(value);
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
}
const itDepartment = new ITDepartment(1234, ['nico']);
console.log(itDepartment);
itDepartment.addEmployee('Martha');
itDepartment.addEmployee('nico');
itDepartment.addEmployee('Nicolas Naranjo');
itDepartment.printEmployeeInformation();
const accDepartment = new AccountingDepartment(12345, ['first report']);
accDepartment.addReport('Second report');
accDepartment.setMostRecentReport = 'third report';
console.log(accDepartment.getMostRecentReport);
console.log(accDepartment);
