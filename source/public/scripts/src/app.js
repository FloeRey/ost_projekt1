import TaskService from "./services/task.service.js";
import LoadingService from "./services/loading.service.js";
import TasksComponent from "./components/tasks.component.js";
import LoadingComponent from "./components/loading.component.js";

class App {
  constructor() {
    this.initService();
    this.tasksComponent = new TasksComponent(this);
    this.loadingComponent = new LoadingComponent(this);

    this.loadingComponent.initialize();
    this.tasksComponent.initialize();
  }

  initService() {
    this.taskService = new TaskService();
    this.loadingService = new LoadingService();
  }
}

document.addEventListener("DOMContentLoaded", () => new App());
