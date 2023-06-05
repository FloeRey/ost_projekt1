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
    this.pubSub.subscribe("changesFromTaskComponent", this.updateFormFromTasks);
  }

  initialize() {
    this.headerButtonsModel.checkCompletes(this.taskService.hasCompleteOne);
    this.sortByDefault();
    this.render();
  }

  updateFormFromTasks = () => {
    this.headerButtonsModel.checkCompletesDynamic(
      this.taskService.hasCompleteOne
    );

    this.render();
  };

  sortByName() {
    this.headerButtonsModel.sort("name_filter");
    this.taskService.sort(
      this.headerButtonsModel.activeFilter,
      this.headerButtonsModel.activeDirection
    );
    this.HeaderButtonsView.updateFilter(this.headerButtonsModel);
  }

  sortByDefault() {
    this.headerButtonsModel.sort(this.headerButtonsModel.activeFilter);

    this.taskService.sort(
      this.headerButtonsModel.activeFilter,
      this.headerButtonsModel.activeDirection
    );
  }

  sortByDueDate() {
    this.headerButtonsModel.sort("date_filter");
    this.taskService.sort(
      this.headerButtonsModel.activeFilter,
      this.headerButtonsModel.activeDirection
    );
    this.HeaderButtonsView.updateFilter(this.headerButtonsModel);
  }

  OnclickButton(e) {
    switch (e.target.id) {
      case "toggleFilterDiv":
        this.HeaderButtonsView.toggleFilters();
        break;
      case "createNewTask":
        this.statusService.createNewTask();
        break;
      case "name_filter":
        this.sortByName();
        break;
      case "date_filter":
        this.sortByDueDate();
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
        this.headerButtonsModel.toggle("completed_filter");
        this.taskService.toggleCompleteTasks(
          this.headerButtonsModel.buttonStatus.completed_filter
        );

        this.HeaderButtonsView.updateFilter(this.headerButtonsModel);

        this.pubSub.publish(
          "changesFromHeaderButtons",
          this.headerButtonsModel.buttonStatus.completed_filter
        );
        break;
      default:
        break;
    }
  }

  render() {
    console.log(this.headerButtonsModel.completes);
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
