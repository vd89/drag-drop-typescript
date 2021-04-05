import { autobind } from "../Decorators/autoBind.js";
import { Draggable } from "../Models/dragDrop.js";
import { Project } from "../Models/project.js";
import { Component } from "./baseComponent.js";

  // ProjectItem Class
  export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    get persons() {
      if (this.project.people === 1) {
        return '1 person';
      } else {
        return `${this.project.people} persons`;
      }
    }

    constructor(hostId: string, project: Project) {
      super('single-project', hostId, false, project.id);
      this.project = project;

      this.configure();
      this.renderContent();
    }
    @autobind
    dragStartHandler(e: DragEvent): void {
      e.dataTransfer!.setData('text/plain', this.project.id);
      e.dataTransfer!.effectAllowed = 'move';
    }
    dragEndHandler(_: DragEvent): void {
      console.log('DragEnd');
    }

    configure() {
      this.element.addEventListener('dragstart', this.dragStartHandler);
      this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
      this.element.querySelector('h2')!.textContent = this.project.title;
      this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
      this.element.querySelector('p')!.textContent = this.project.description;
    }
  }
