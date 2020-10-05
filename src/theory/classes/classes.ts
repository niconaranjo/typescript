class Department {
  protected employees: string[] = [];

  constructor(private readonly id: number, private name: string) {

  }

  describe(this: Department) {
    console.log("Department: " + this.name)
  }

  addEmployee(employee: string) {
    this.employees.push(employee)
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  constructor(id: number, public admins: string[]) {
    super(id, 'IT')
  }

  addEmployee(name: string) {
    if(name === 'nico') return;
    this.employees.push(name)
  }

}

class AccountingDepartment extends Department {
  private lastReport: string;

  constructor(id: number, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  get getMostRecentReport() {
    if(this.lastReport) {
      return this.lastReport;
    }

    return "No reports found...";
  }

  set setMostRecentReport(value: string) {
    if(!value) {
      throw new Error("Please enter a valid value");
    }

    this.addReport(value);
  }

  addReport(text: string) {
    this.reports.push(text)
    this.lastReport = text
  }
}

const itDepartment = new ITDepartment(1234, ['nico']);

console.log(itDepartment)

itDepartment.addEmployee('Martha')
itDepartment.addEmployee('nico')
itDepartment.addEmployee('Nicolas Naranjo')
itDepartment.printEmployeeInformation();

const accDepartment = new AccountingDepartment(12345, ['first report'])

accDepartment.addReport('Second report')
accDepartment.setMostRecentReport = 'third report';
console.log(accDepartment.getMostRecentReport)


console.log(accDepartment)