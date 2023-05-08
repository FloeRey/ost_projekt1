import BaseComponent from "./base.component.js";
import ServiceRegistry from "../services/serviceRegistry.js";

export default class TasksComponent extends BaseComponent {
  constructor(app) {
    super(app);
    this.taskService = ServiceRegistry.getService("taskService");
    this.loadingService = ServiceRegistry.getService("loadingService");
    this.statusService = ServiceRegistry.getService("statusService");
    this.loadingService.addObserver(this);
    this.statusService.addObserver(this);
    this.showTasks = true;
  }

  async initialize() {
    this.container = this.getElement("tasks");
    this.taskTemplate = this.template("tasks");
    await this.taskService.fetchTasks();
    this.loadingService.stateChange(false);
  }

  renderTasks() {
    this.container.innerHTML = "";
    this.taskService.tasks.forEach((task) => {
      const renderedTaskEntry = this.taskTemplate({ task });
      this.container.insertAdjacentHTML("afterbegin", renderedTaskEntry);
    });
  }

  hideTasks() {
    this.container.innerHTML = "";
  }

  ObsLoading(data) {
    if (!data.isLoading && this.showTasks) {
      this.renderTasks();
    }
  }

  ObsStatus(data) {
    console.log(data.showTasks);
    if (this.showTasks !== data.showTasks) {
      this.showTasks = data.showTasks;
      if (data.showTasks) this.renderTasks();
      if (!data.showTasks) this.hideTasks();
    }
  }
}
