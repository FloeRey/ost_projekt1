import BaseComponent from "./base.component.js";
import LoadingService from "../services/loading.service.js";
import StatusService from "../services/status.service.js";
import TaskService from "../services/task.service.js";
import headerButtonsModel from "../models/headerButtons.model.js";
import HeaderButtonsView from "../views/headerButtons.view.js";
import PubSub from "../utils/pubSub.js";
import UserService from "../services/userService.js";

export default class HeaderbuttonsComponent extends BaseComponent {
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
    this.checkFilter();
    this.render();
  }

  checkFilter() {
    if (Object.keys(UserService.userData.filter_settings).length !== 0) {
      this.headerButtonsModel.sort(
        UserService.userData.filter_settings.activeFilter,
        UserService.userData.filter_settings.activeDirection
      );
      this.headerButtonsModel.toggle(
        "completed-filter",
        UserService.userData.filter_settings.buttonStatus
      );
      this.taskService.toggleCompleteTasks(
        this.headerButtonsModel.buttonStatus["completed-filter"]
      );
      this.pubSub.publish(
        "changesFromHeaderButtons",
        this.headerButtonsModel.buttonStatus["completed-filter"]
      );
    } else {
      this.sortByDefault();
    }
  }

  updateFormFromTasks = () => {
    this.headerButtonsModel.checkCompletesDynamic(
      this.taskService.hasCompleteOne
    );

    this.render();
  };

  sortByName() {
    this.headerButtonsModel.sort("name-filter");
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

  sortByNoDate() {
    this.headerButtonsModel.sort("noDate-filter");
    this.taskService.sort(
      this.headerButtonsModel.activeFilter,
      this.headerButtonsModel.activeDirection
    );
    this.HeaderButtonsView.updateFilter(this.headerButtonsModel);
  }

  sortByDueDate() {
    this.headerButtonsModel.sort("date-filter");
    this.taskService.sort(
      this.headerButtonsModel.activeFilter,
      this.headerButtonsModel.activeDirection
    );
    this.HeaderButtonsView.updateFilter(this.headerButtonsModel);
  }

  OnclickButton(e) {
    switch (e.target.id) {
      case "toggle-filter-div":
        this.HeaderButtonsView.toggleFilters();
        break;
      case "create-new-task":
        this.statusService.createNewTask();
        break;
      case "name-filter":
        this.sortByName();
        break;
      case "noDate-filter":
        this.sortByNoDate();
        break;
      case "date-filter":
        this.sortByDueDate();
        break;
      case "creationDate-filter":
        this.headerButtonsModel.sort("creationDate-filter");
        this.taskService.sort(
          this.headerButtonsModel.activeFilter,
          this.headerButtonsModel.activeDirection
        );
        this.HeaderButtonsView.updateFilter(this.headerButtonsModel);
        break;
      case "importance-filter":
        this.headerButtonsModel.sort("importance-filter");
        this.taskService.sort(
          this.headerButtonsModel.activeFilter,
          this.headerButtonsModel.activeDirection
        );
        this.HeaderButtonsView.updateFilter(this.headerButtonsModel);
        break;
      case "completed-filter":
        this.headerButtonsModel.toggle("completed-filter");
        this.taskService.toggleCompleteTasks(
          this.headerButtonsModel.buttonStatus["completed-filter"]
        );
        this.HeaderButtonsView.updateFilter(this.headerButtonsModel);
        this.pubSub.publish(
          "changesFromHeaderButtons",
          this.headerButtonsModel.buttonStatus["completed-filter"]
        );
        break;
      default:
        break;
    }
    if (e.target.id.search(/-filter$/i) !== -1) {
      UserService.updateFilter(this.headerButtonsModel);
    }
  }

  render() {
    this.app.events.pageChanged(this, true);
    this.HeaderButtonsView.render(this.headerButtonsModel);
  }

  hideButtons() {
    this.app.events.pageChanged(this, false);
  }

  ObsStatus(data) {
    if (this.createTask !== data.createTask) {
      this.createTask = data.createTask;
      if (data.createTask) this.hideButtons();
      if (!data.createTask) this.render();
    }
  }
}
