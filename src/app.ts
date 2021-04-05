/// <reference path="./Models/dragDrop.ts" />
/// <reference path="./Models/project.ts" />
/// <reference path="./State/projectState.ts" />
/// <reference path="./Utils/validation.ts" />
/// <reference path="./Decorators/autoBind.ts" />
/// <reference path="./Components/projectList.ts" />
/// <reference path="./Components/projectInput.ts" />

namespace App {
  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');
}
