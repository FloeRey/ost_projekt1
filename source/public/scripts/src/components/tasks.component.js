import BaseComponent from "./base.component.js";

import PubSub from "../utils/pubSub.js";
import LoadingService from "../services/loading.service.js";
import StatusService from "../services/status.service.js";
import TaskService from "../services/task.service.js";

import TaskModel from "../models/task.model.js";
import TasksView from "../views/tasks.view.js";

export default class TasksComponent extends BaseComponent {
  constructor(app) {
    super(app);
    this.loadingService = LoadingService;
    this.statusService = StatusService;
    this.taskService = TaskService;
    this.loadingService.addObserver(this);
    this.statusService.addObserver(this);
    this.taskService.addObserver(this);

    this.pubSub = PubSub;
    this.showTasks = true;
    this.container = this.getElement();
    this.template = this.template();
    this.model = new TaskModel();
    this.view = new TasksView(this.container, this.template);
    this.container.addEventListener("click", this);
    this.pubSub.subscribe(
      "changesFromHeaderButtons",
      this.updateFromHeaderButtons
    );
    this.hideShowButton_Headerbuttons_status = 0;
  }

  updateFromHeaderButtons = (data) => {
    this.hideShowButton_Headerbuttons_status = data;
  };

  async initialize() {
    this.renderTasks();
  }

  OnclickButton(e) {
    e.stopPropagation();
    const taskId = e.target.getAttribute("data-id");
    switch (e.target.id.replace(/_[0-9]*/g, "")) {
      case "editTask":
        this.statusService.editTask(taskId);
        break;
      case "removeTask":
        if (this.model.warn()) {
          this.taskService.removeTask(taskId);
        }
        break;
      case "complete":
        this.updateDB(taskId);
        break;
      default:
        break;
    }
  }

  renderTasks() {
    this.view.renderTasks(this.taskService.allTask);
  }

  async updateDB(taskId) {
    try {
      await this.taskService.toggleComplete(taskId);
    } catch (e) {
      alert("not updated db - local storage updated");
    }

    this.taskService.toggleCompleteTasks(
      this.hideShowButton_Headerbuttons_status
    );
    this.pubSub.publish("changesFromTaskComponent");
    this.renderTasks();
  }

  hideTasks() {
    this.container.innerHTML = "";
  }

  ObsLoading(data) {
    console.log("loading observer", data);
    /* finish loading */
    if (!data.isLoading && this.showTasks) {
      this.renderTasks();
    }
  }

  ObsStatus(data) {
    console.log("status observer", data);
    /* status change = hide / show */
    if (data.showTasks !== undefined) {
      if (this.showTasks !== data.showTasks) {
        this.showTasks = data.showTasks;
        if (data.showTasks) this.renderTasks();
        if (!data.showTasks) this.hideTasks();
      }
    }
  }

  ObsTasks(data) {
    console.log("observable tasks", data);
    if (this.showTasks) this.renderTasks();
  }
}
