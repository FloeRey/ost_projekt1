import BaseComponent from "./base.component.js";
import LoadingService from "../services/loading.service.js";
import StatusService from "../services/status.service.js";
import TaskService from "../services/task.service.js";
import headerButtonsModel from "../models/headerButtons.model.js";
import HeaderButtonsView from "../views/headerButtons.view.js";
import PubSub from "../utils/pubSub.js";

export default class HeaderButtonsComponent extends BaseComponent {
  constructor(app) {
    super(app);
    this.loadingService = LoadingService;
    this.statusService = StatusService;
    this.taskService = TaskService;
    this.loadingService.addObserver(this);
    this.statusService.addObserver(this);
    this.headerButtonsModel = headerButtonsModel;
    this.container = this.getElement();
    this.buttonsTemplate = this.template();
    this.container.addEventListener("click", this);
    this.HeaderButtonsView = new HeaderButtonsView(
      this.container,
      this.buttonsTemplate
    );
    this.pubSub = PubSub;
    this.pubSub.subscribe(
      "changesFromTaskComponent",
      this.updateFormFromTasks.bind(this)
    );
  }

  initialize() {
    this.headerButtonsModel.checkCompletes(this.taskService.hasCompleteOne);
    this.render();
  }

  updateFormFromTasks() {
    this.headerButtonsModel.checkCompletes(this.taskService.hasCompleteOne);
    this.render();
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

  render() {
    this.HeaderButtonsView.render(this.headerButtonsModel);
  }

  hideButtons() {
    this.HeaderButtonsView.hide();
  }

  ObsStatus(data) {
    console.log("status observer", data);
    if (this.createTask !== data.createTask) {
      this.createTask = data.createTask;
      if (data.createTask) this.hideButtons();
      if (!data.createTask) this.render();
    }
  }
}
