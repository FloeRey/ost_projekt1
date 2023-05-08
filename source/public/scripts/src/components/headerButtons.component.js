import BaseComponent from "./base.component.js";
import ServiceRegistry from "../services/serviceRegistry.js";

export default class HeaderButtonsComponent extends BaseComponent {
  constructor(app) {
    super(app);
    this.headerButtons = new Handlebars.SafeString(
      "<button id='backButton'>backButton</button><button id=''>button2</button>"
    );
    this.loadingService = app.loadingService;
    this.statusService = ServiceRegistry.getService("statusService");
    this.loadingService.addObserver(this);
    this.statusService.addObserver(this);
  }

  initialize() {
    this.container = this.getElement();
    this.buttonsTemplate = this.template();
    this.container.addEventListener("click", this);
  }

  OnclickButton(e) {
    switch (e.target.id) {
      case "create":
        this.statusService.createNewTask();
        break;
      case "backButton":
        this.statusService.homeView();
        break;
      default:
        break;
    }
  }

  ObsLoading(data) {
    if (!data.isLoading) {
      this.container.innerHTML = this.buttonsTemplate({
        filterButtons: this.headerButtons,
      });
    }
  }

  ObsStatus(data) {
    console.log("new status received", data);
  }
}
