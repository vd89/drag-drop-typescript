// AutoBind decorator
function autoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

// Project Input Class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInpElement: HTMLInputElement;
  descInpElement: HTMLInputElement;
  peopleInpElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';
    this.titleInpElement = this.element.querySelector('#title')! as HTMLInputElement;
    this.descInpElement = this.element.querySelector('#description')! as HTMLInputElement;
    this.peopleInpElement = this.element.querySelector('#people')! as HTMLInputElement;
    this.configure();
    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
  // @autoBind
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInpElement.value;
    const enteredDesc = this.descInpElement.value;
    const enteredPeople = this.peopleInpElement.value;
    if (enteredTitle.trim().length === 0 || enteredDesc.trim().length === 0 || enteredPeople.trim().length === 0) {
      alert('Invalid input, please try again!!!!');
      return;
    } else {
      return [enteredTitle, enteredDesc, +enteredPeople];
    }
  }

  private clearInput() {
    this.titleInpElement.value = '';
    this.descInpElement.value = '';
    this.peopleInpElement.value = '';
  }

  @autoBind
  private submitHandler(e: Event) {
    e.preventDefault();
    const userInput = this.gatherUserInput();
    console.log(userInput);
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      console.log(title, desc, people);
      this.clearInput();
    }
  }
  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }
}

const prjInput = new ProjectInput();
