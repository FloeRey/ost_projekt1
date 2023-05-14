import BaseComponent from "./base.component.js";
import ServiceRegistry from "../services/serviceRegistry.js";

export default class InfoComponent extends BaseComponent {
  constructor(app) {
    super(app);

    this.mode = null;
    this.taskService = ServiceRegistry.getService("taskService");
    this.statusService = ServiceRegistry.getService("statusService");

    this.mode = this.taskService.workMode;
    this.taskService.addObserver(this);
  }

  initialize() {
    this.template = this.template();
    this.container = this.getElement();
    this.theme = this.statusService.theme;
    this.container.addEventListener("click", this);
    this.render();
    /*
    document.getElementById("changeTheme").addEventListener("click", () => {
      this.statusService.changeTheme();
      // Array.from(document.body.)
    });*/
  }

  render() {
    this.container.innerHTML = "";
    this.container.innerHTML = this.template({
      infoText: `you working on ${this.mode}`,
      mode: this.mode,
      theme: this.theme,
    });
  }

  OnclickButton(e) {
    if (e.target.id === "changeTheme") {
      this.statusService.changeTheme();
      this.theme = this.statusService.theme;

      this.render();
    }
  }

  ObsStatus() {
    //if (this.statusService.theme !== this.theme) { }
  }

  changeTasksMode(mode) {
    this.mode = mode;
    this.render();
  }
}
