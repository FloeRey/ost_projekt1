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
    this.container.addEventListener("click", this);
    this.render();
    /*
    document.getElementById("changeTheme").addEventListener("click", () => {
      this.statusService.changeTheme();
      // Array.from(document.body.)
    });*/
  }

  render() {
    console.log("****", this.mode);
    this.container.innerHTML = "";
    this.container.innerHTML = this.template({
      infoText: `you working on ${this.mode}`,
      mode: this.mode ? this.mode : "light",
    });
  }

  OnclickButton(e) {
    console.log(e.target);
    if (e.target.id === "changeTheme") {
      this.statusService.changeTheme();
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
