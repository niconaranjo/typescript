// Project Component
export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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