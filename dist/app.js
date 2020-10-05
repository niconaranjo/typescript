"use strict";
//Enum for status
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
// Project class
class Project {
    constructor(title, description, numOfPeople, status) {
        this.title = title;
        this.description = description;
        this.numOfPeople = numOfPeople;
        this.status = status;
        this.id = Math.random().toString();
    }
}
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
// Project State
class ProjectStateManager extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectStateManager();
        return this.instance;
    }
    addProject(title, description, numOfPeople) {
        const newProject = new Project(title, description, numOfPeople, ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find((proj) => proj.id === projectId);
        if (project && project.status != newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectStateManager.getInstance();
function validation(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}
// End Validation
// Project Component
class Component {
    constructor(templateID, hostID, insertAtBegin, newElementId) {
        this.templateElement = (document.getElementById(templateID));
        this.hostElement = document.getElementById(hostID);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId)
            this.element.id = newElementId;
        this.printToHost(insertAtBegin);
    }
    printToHost(insertAtBegin) {
        this.hostElement.insertAdjacentElement(insertAtBegin ? "afterbegin" : "beforeend", this.element);
    }
}
// Project Item
class ProjectItem extends Component {
    constructor(hostID, project) {
        super("single-project", hostID, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    get persons() {
        if (this.project.numOfPeople === 1) {
            return "1 person";
        }
        else
            return `${this.project.numOfPeople} persons`;
    }
    dragStartHandler(event) {
        event.dataTransfer.setData("text/plain", this.project.id);
        event.dataTransfer.effectAllowed = "move";
    }
    dragEndHandler(_) {
        console.log("Ended");
    }
    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler.bind(this));
        this.element.addEventListener("dragend", this.dragEndHandler.bind(this));
    }
    renderContent() {
        this.element.querySelector("h2").textContent = this.project.title;
        this.element.querySelector("h3").textContent = this.persons + " assigned";
        this.element.querySelector("p").textContent = this.project.description;
    }
}
// Project List Class
class ProjectListClass extends Component {
    constructor(type) {
        super("project-list", "app", false, `${type}-projects`);
        this.type = type;
        this.listId = "";
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        //console.log(event.dataTransfer)
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            const ulElement = this.element.querySelector("ul");
            ulElement.classList.add("droppable");
        }
    }
    dropHandler(event) {
        const projectId = event.dataTransfer.getData("text/plain");
        projectState.moveProject(projectId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
    }
    dragLeaveHandler(_) {
        const ulElement = this.element.querySelector("ul");
        ulElement.classList.remove("droppable");
    }
    configure() {
        this.element.addEventListener("dragover", this.dragOverHandler.bind(this));
        this.element.addEventListener("dragleave", this.dragLeaveHandler.bind(this));
        this.element.addEventListener("drop", this.dropHandler.bind(this));
        projectState.addListener((projects) => {
            const relevantProjects = projects.filter((proj) => {
                if (this.type === "active") {
                    return proj.status === ProjectStatus.Active;
                }
                return proj.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
        this.listId = `${this.type}-projects-lists`;
    }
    renderContent() {
        this.element.querySelector("ul").id = this.listId;
        this.element.querySelector("h2").textContent =
            this.type.toUpperCase() + " PROJECTS";
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.listId}`);
        listEl.innerHTML = "";
        for (const projItem of this.assignedProjects) {
            new ProjectItem(this.listId, projItem);
        }
    }
}
// Project set up
class ProjectInput extends Component {
    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#description");
        this.peopleInputElement = this.element.querySelector("#people");
        this.configure();
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandler.bind(this));
    }
    renderContent() { }
    getUserInput() {
        const titleValue = this.titleInputElement.value;
        const descriptionValue = this.descriptionInputElement.value;
        const peopleValue = +this.peopleInputElement.value;
        const titleValidation = {
            value: titleValue,
            required: true,
        };
        const descriptionValidation = {
            value: descriptionValue,
            required: true,
            minLength: 5,
        };
        const peopleValidation = {
            value: peopleValue,
            required: true,
            min: 1,
            max: 5,
        };
        if (!validation(titleValidation) ||
            !validation(descriptionValidation) ||
            !validation(peopleValidation)) {
            alert("Please review the fields!!");
            return;
        }
        else {
            return [titleValue, descriptionValue, +peopleValue];
        }
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.getUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            projectState.addProject(title, description, people);
            this.clearInputs();
        }
    }
    clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
}
const startProject = new ProjectInput();
const test = new ProjectListClass("active");
const test2 = new ProjectListClass("finished");
