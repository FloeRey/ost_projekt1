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
    this.taskService.addObserver(this);

    this.showTasks = true;
  }

  async initialize() {
    this.container = this.getElement("tasks");
    this.taskTemplate = this.template("tasks");
    /* load tasks to tasks in taskService */
    // await this.taskService.fetchTasks();
    /* set loading to false */
    this.loadingService.stateChange(false);
    this.container.addEventListener("click", this);
  }

  OnclickButton(e) {
    if (e.target.classList.contains("editTask")) {
      const taskId = e.target.parentNode.getAttribute("data-id");
      this.statusService.editTask(taskId);
    } else if (e.target.classList.contains("removeTask")) {
      const taskId = e.target.parentNode.getAttribute("data-id");

      const text = "Are you sure to delete?";
      if (window.confirm(text) === true) {
        this.taskService.removeTask(taskId);
      }
    } else if (e.target.classList.contains("complete")) {
      const taskId = e.target.parentNode.getAttribute("data-id");
      this.taskService.toggleComplete(taskId);
    }
  }

  renderTasks() {
    this.container.innerHTML = "";
    /* get tasks from taskService */
    this.taskService.tasks.forEach((task) => {
      const renderedTaskEntry = this.taskTemplate({ task });
      this.container.insertAdjacentHTML("afterbegin", renderedTaskEntry);
    });
  }

  hideTasks() {
    this.container.innerHTML = "";
  }

  ObsLoading(data) {
    /* finish loading */
    if (!data.isLoading && this.showTasks) {
      this.renderTasks();
    }
  }

  ObsStatus(data) {
    /* status change = hide / show */
    if (data.showTasks !== undefined) {
      if (this.showTasks !== data.showTasks) {
        this.showTasks = data.showTasks;
        if (data.showTasks) this.renderTasks();
        if (!data.showTasks) this.hideTasks();
      }
    }
  }

  ObsTasks() {
    this.renderTasks();
  }
}
