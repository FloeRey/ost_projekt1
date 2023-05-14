import TasksModel from "./models/tasks.model.js";
import TasksView from "./views/tasks.view.js";
import TasksController from "./controllers/tasks.controller.js";

import AppStatusService from "./services/appstatus.service.js";

import HeaderButtons from "./components/headerButtons.component.js";
import FormComponent from "./components/form.component.js";

class App {
  constructor() {
    AppStatusService.initialize().then((userData) => {
      this.userData = userData;
      if (this.userData.theme === "dark") {
        document.body.classList.add("darkTheme");
      } else {
        document.body.classList.remove("darkTheme");
      }
      this.loadApplication();
    });
  }

  loadApplication() {
    /* MVC Pattern */
    this.tasksModel = new TasksModel();
    this.tasksView = new TasksView();
    this.taskController = new TasksController(this.tasksModel, this.tasksView);
    this.taskController.initialize();

    /* component */
    this.headerButtons = new HeaderButtons();
    this.headerButtons.initialize();
    /* component */
    this.formComponent = new FormComponent();
  }
}

document.addEventListener("DOMContentLoaded", () => new App());
