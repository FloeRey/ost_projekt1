import TaskService from "./services/task.service.js";
import LoadingService from "./services/loading.service.js";
import StatusService from "./services/status.service.js";

import LoadingComponent from "./components/loading.component.js";
import HeaderButtonsComponent from "./components/headerButtons.component.js";
import TasksComponent from "./components/tasks.component.js";
import FormComponent from "./components/form.component.js";

import ServiceRegistry from "./services/serviceRegistry.js";

class App {
  constructor() {
    this.initService();

    /* work with service registry dependency */
    this.loadingComponent = new LoadingComponent();
    this.FormComponent = new FormComponent();

    /* work with full app component */
    this.HeaderButtonsComponent = new HeaderButtonsComponent(this);
    this.TasksComponent = new TasksComponent(this);

    this.loadingComponent.initialize();
    this.HeaderButtonsComponent.initialize();
    this.FormComponent.initialize();
    this.TasksComponent.initialize();
  }

  initService() {
    this.taskService = new TaskService();
    this.loadingService = new LoadingService();
    this.statusService = new StatusService();
    /* create registry for all services */
    ServiceRegistry.addService("taskService", this.taskService);
    ServiceRegistry.addService("loadingService", this.loadingService);
    ServiceRegistry.addService("statusService", this.statusService);
  }
}

document.addEventListener("DOMContentLoaded", () => new App());
