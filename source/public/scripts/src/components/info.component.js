import BaseComponent from "./base.component.js";
import TaskService from "../services/task.service.js";
import StatusService from "../services/status.service.js";
import InfoModel from "../models/info.model.js";
import InfoView from "../views/info.view.js";
import userService from "../services/userService.js";

export default class InfoComponent extends BaseComponent {
  constructor(app) {
    super(app);
    this.taskService = TaskService;
    this.statusService = StatusService;
    this.workMode = this.taskService.workMode;
    this.statusService.addObserver(this);
    this.container = this.getElement();
    this.taskService.addObserver(this);
    this.template = this.template();
    this.model = new InfoModel(userService.getData);
    this.view = new InfoView(this.container, this.template);
    this.container.addEventListener("click", this);
  }

  initialize() {
    this.render();
  }

  render() {
    this.app.events.pageChanged(this, true);
    this.view.render(this.workMode, this.model);
  }

  hide() {
    this.app.events.pageChanged(this, false);
  }

  OnclickButton(e) {
    if (e.target.id === "changetheme") {
      this.theme = userService.changeTheme();
      this.statusService.updateTheme(this.theme);
      this.model.updateData(userService.getData);
      this.render();
    }
  }

  changeTasksMode(workMode) {
    this.workMode = workMode;
    this.render();
  }

  ObsStatus(data) {
    if (data.createTask) this.hide();
    else this.render();
  }
}
