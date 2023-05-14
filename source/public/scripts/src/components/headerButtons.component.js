import BaseComponent from "./base.component.js";
import ServiceRegistry from "../services/serviceRegistry.js";

import headerButtonsModel from "../models/headerButtons.model.js";
import HeaderButtonsView from "../views/headerButtons.view.js";
import PubSub from "../utils/pubSub.js";

export default class HeaderButtonsComponent extends BaseComponent {
  constructor(app) {
    super(app);
    this.loadingService = app.loadingService;
    this.statusService = ServiceRegistry.getService("statusService");
    this.taskService = ServiceRegistry.getService("taskService");
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
    this.headerButtonsModel.checkCompletes(this.taskService.hasCompleteOne);
    this.pubSub = PubSub;
    this.pubSub.subscribe(
      "changesFromTaskComponent",
      this.updateFormFromTasks.bind(this)
    );
  }

  updateFormFromTasks() {
    this.headerButtonsModel.checkCompletes(this.taskService.hasCompleteOne);
    this.renderForm();
  }

  OnclickButton(e) {
    switch (e.target.id) {
      case "createNewTask":
        this.statusService.createNewTask();
        break;
      case "name_filter":
        this.headerButtonsModel.sort("name_filter");
        this.taskService.sort(
          this.headerButtonsModel.activeFilter,
          this.headerButtonsModel.activeDirection
        );
        this.HeaderButtonsView.updateFilter(this.headerButtonsModel);
        break;
      case "date_filter":
        this.headerButtonsModel.sort("date_filter");
        this.taskService.sort(
          this.headerButtonsModel.activeFilter,
          this.headerButtonsModel.activeDirection
        );
        this.HeaderButtonsView.updateFilter(this.headerButtonsModel);
        break;
      case "creationDate_filter":
        this.headerButtonsModel.sort("creationDate_filter");
        this.taskService.sort(
          this.headerButtonsModel.activeFilter,
          this.headerButtonsModel.activeDirection
        );
        this.HeaderButtonsView.updateFilter(this.headerButtonsModel);
        break;
      case "importance_filter":
        this.headerButtonsModel.sort("importance_filter");
        this.taskService.sort(
          this.headerButtonsModel.activeFilter,
          this.headerButtonsModel.activeDirection
        );
        this.HeaderButtonsView.updateFilter(this.headerButtonsModel);
        break;
      case "completed_filter":
        this.headerButtonsModel.sort("completed_filter");
        this.taskService.toggleCompleteTasks(
          this.headerButtonsModel.activeDirection
        );
        this.HeaderButtonsView.updateFilter(this.headerButtonsModel);
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
