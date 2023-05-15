import BaseComponent from "./base.component.js";

import PubSub from "../utils/pubSub.js";
import LoadingService from "../services/loading.service.js";
import StatusService from "../services/status.service.js";
import TaskService from "../services/task.service.js";

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
    this.taskTemplate = this.template();
    this.container.addEventListener("click", this);
    this.pubSub.subscribe(
      "changesFromHeaderButtons",
      this.updateFromHeaderButtons.bind(this)
    );
    this.hideShowButton_Headerbuttons_status = 0;
  }

  updateFromHeaderButtons(data) {
    this.hideShowButton_Headerbuttons_status = data;
  }

  async initialize() {
    this.renderTasks();
  }

  OnclickButton(e) {
    e.stopPropagation();

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
      const taskId = e.target.parentNode.parentNode.getAttribute("data-id");
      const button = e.target;

      if (button.classList.contains("isCompleted")) {
        button.innerHTML = "mark as Complete";

        button.classList.remove("isCompleted");
      } else {
        button.innerHTML = "isComplete";
        button.classList.add("isCompleted");
      }

      this.updateDB(taskId);
    }
  }

  async updateDB(taskId) {
    try {
      await this.taskService.toggleComplete(taskId);
    } catch (e) {
      alert("not updated db - local storage updated");
    }
    this.renderTasks();
    this.taskService.toggleCompleteTasks(
      this.hideShowButton_Headerbuttons_status
    );
    /*
    const taskElement = document.querySelector(`[data-id="${taskId}"]`);

    // eslint-disable-next-line no-unused-expressions
    taskElement.classList.contains("completed")
      ? taskElement.classList.remove("completed")
      : taskElement.classList.add("completed");

    if (this.headerButtons_ShowHideComplete_Status === 1) {
      taskElement.style.display = "none";
    }*/
    this.pubSub.publish("changesFromTaskComponent");
  }

  renderTasks() {
    this.container.innerHTML = "";
    this.taskService.tasks.forEach((task, index) => {
      const renderedTaskEntry = this.taskTemplate({ task, id: index });
      this.container.insertAdjacentHTML("afterbegin", renderedTaskEntry);
    });
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
    this.renderTasks();
  }
}
