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
  @autoBind
  private submitHandler(e: Event) {
    e.preventDefault();
    console.log(this.titleInpElement.value);
  }
  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }
}

const prjInput = new ProjectInput();
