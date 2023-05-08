import BaseComponent from "./base.component.js";
import ServiceRegistry from "../services/serviceRegistry.js";

import headerButtonsModel from "../models/headerButtons.model.js";
import HeaderButtonsView from "../views/headerButtons.view.js";

export default class HeaderButtonsComponent extends BaseComponent {
  constructor(app) {
    super(app);
    this.loadingService = app.loadingService;
    this.statusService = ServiceRegistry.getService("statusService");
    this.loadingService.addObserver(this);
    this.statusService.addObserver(this);
    this.headerButtonsModel = headerButtonsModel;
  }

  initialize() {
    this.container = this.getElement();
    this.buttonsTemplate = this.template();
    this.container.addEventListener("click", this);
    this.HeaderButtonsView = new HeaderButtonsView(
      this.container,
      this.buttonsTemplate
    );
  }

  OnclickButton(e) {
    switch (e.target.id) {
      case "create":
        this.statusService.createNewTask();
        break;
      default:
        break;
    }
  }

  ObsLoading(data) {
    if (!data.isLoading) {
      this.renderForm(this.headerButtons);
    }
  }

  renderForm() {
    this.HeaderButtonsView.render(this.headerButtonsModel);
  }

  hideButtons() {
    this.HeaderButtonsView.hide();
  }

  ObsStatus(data) {
    if (this.createTask !== data.createTask) {
      this.createTask = data.createTask;
      if (data.createTask) this.hideButtons();
      if (!data.createTask) this.renderForm();
    }
  }
}
