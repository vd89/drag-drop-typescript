/// <reference path="./Components/projectList.ts" />
/// <reference path="./Components/projectInput.ts" />

namespace App {
  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');
}
