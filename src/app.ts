// First Proyect
// Drag and Drop
interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

//Enum for status
enum ProjectStatus {
  Active,
  Finished,
}

// Project class
class Project {
  id: string;

  constructor(
    public title: string,
    public description: string,
    public numOfPeople: number,
    public status: ProjectStatus
  ) {
    this.id = Math.random().toString();
  }
}

// Listener Type
type Listener<T> = (projects: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

// Project State
class ProjectStateManager extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectStateManager;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectStateManager();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );

    this.projects.push(newProject);
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find( (proj) => proj.id === projectId);

    if(project && project.status != newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }

  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

const projectState = ProjectStateManager.getInstance();

// validation
interface validate {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validation(validatableInput: validate): boolean {
  let isValid = true;

  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }

  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }

  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }

  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }

  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }

  return isValid;
}
// End Validation

// Project Component
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateID: string,
    hostID: string,
    insertAtBegin: boolean,
    newElementId?: string
  ) {
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById(templateID)!
    );

    this.hostElement = <T>document.getElementById(hostID)!;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = <U>importedNode.firstElementChild;
    if (newElementId) this.element.id = newElementId;

    this.printToHost(insertAtBegin);
  }

  private printToHost(insertAtBegin: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBegin ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

// Project Item
class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  private project: Project;

  get persons() {
    if (this.project.numOfPeople === 1) {
      return "1 person";
    } else return `${this.project.numOfPeople} persons`;
  }

  constructor(hostID: string, project: Project) {
    super("single-project", hostID, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
    
  }

  dragEndHandler(_: DragEvent) {
    console.log("Ended");
  }

  configure() {
    this.element.addEventListener(
      "dragstart",
      this.dragStartHandler.bind(this)
    );
    this.element.addEventListener("dragend", this.dragEndHandler.bind(this));
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons + " assigned";
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}

// Project List Class
class ProjectListClass
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  assignedProjects: Project[];
  listId: string = "";

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);

    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  dragOverHandler(event: DragEvent) {
    //console.log(event.dataTransfer)
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const ulElement = this.element.querySelector("ul")!;
      ulElement.classList.add("droppable");
    }
  }

  dropHandler(event: DragEvent) {
    const projectId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(projectId, this.type === 'active' ? ProjectStatus.Active: ProjectStatus.Finished)
  }

  dragLeaveHandler(_: DragEvent) {
    const ulElement = this.element.querySelector("ul")!;
    ulElement.classList.remove("droppable");
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler.bind(this));
    this.element.addEventListener(
      "dragleave",
      this.dragLeaveHandler.bind(this)
    );
    this.element.addEventListener("drop", this.dropHandler.bind(this));

    projectState.addListener((projects: Project[]) => {
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
    this.element.querySelector("ul")!.id = this.listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.listId}`)! as HTMLElement;

    listEl.innerHTML = "";

    for (const projItem of this.assignedProjects) {
      new ProjectItem(this.listId, projItem);
    }
  }
}

// Project set up
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  renderContent() {}

  private getUserInput(): [string, string, number] | void {
    const titleValue = this.titleInputElement.value;
    const descriptionValue = this.descriptionInputElement.value;
    const peopleValue = +this.peopleInputElement.value;

    const titleValidation: validate = {
      value: titleValue,
      required: true,
    };
    const descriptionValidation: validate = {
      value: descriptionValue,
      required: true,
      minLength: 5,
    };
    const peopleValidation: validate = {
      value: peopleValue,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validation(titleValidation) ||
      !validation(descriptionValidation) ||
      !validation(peopleValidation)
    ) {
      alert("Please review the fields!!");
      return;
    } else {
      return [titleValue, descriptionValue, +peopleValue];
    }
  }

  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.getUserInput();

    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
      this.clearInputs();
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }
}

const startProject = new ProjectInput();
const test = new ProjectListClass("active");
const test2 = new ProjectListClass("finished");
