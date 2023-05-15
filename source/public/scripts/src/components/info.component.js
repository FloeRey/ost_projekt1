import BaseComponent from "./base.component.js";
import TaskService from "../services/task.service.js";
import StatusService from "../services/status.service.js";

export default class InfoComponent extends BaseComponent {
  constructor(app) {
    super(app);
    this.taskService = TaskService;
    this.statusService = StatusService;
    this.mode = this.taskService.workMode;
    this.taskService.addObserver(this);
    this.template = this.template();
    this.container = this.getElement();
    this.container.addEventListener("click", this);
    this.userData = this.statusService.getData;
  }

  initialize() {
    this.render();
  }

  render() {
    this.container.innerHTML = "";
    this.container.innerHTML = this.template({
      infoText: `you working on ${this.mode}`,
      mode: this.mode,
      theme: this.userData.theme,
    });
  }

  OnclickButton(e) {
    if (e.target.id === "changeTheme") {
      this.statusService.changeTheme();
      this.userData = this.statusService.getData;
      this.render();
    }
  }

  changeTasksMode(mode) {
    console.log("taskService observer (change tasks mode):", mode);
    this.mode = mode;
    this.render();
  }
}
