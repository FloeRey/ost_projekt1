import BaseComponent from "./base.component.js";
import TaskService from "../services/task.service.js";
import StatusService from "../services/status.service.js";

import InfoModel from "../models/info.model.js";
import InfoView from "../views/info.view.js";

export default class InfoComponent extends BaseComponent {
  constructor(app) {
    super(app);
    this.taskService = TaskService;
    this.statusService = StatusService;
    this.workMode = this.taskService.workMode;

    this.container = this.getElement();
    this.taskService.addObserver(this);
    this.template = this.template();

    this.model = new InfoModel(this.statusService.getData);
    this.view = new InfoView(this.container, this.template);

    this.container.addEventListener("click", this);
  }

  initialize() {
    this.render();
  }

  render() {
    this.view.render(this.workMode, this.model);
  }

  OnclickButton(e) {
    if (e.target.id === "changeTheme") {
      this.statusService.changeTheme();
      this.model.updateData(this.statusService.getData);
      this.render();
    }
  }

  changeTasksMode(workMode) {
    this.workMode = workMode;
    this.render();
  }
}
