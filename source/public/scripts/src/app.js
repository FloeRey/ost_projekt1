import TaskService from "./services/task.service.js";
import StatusService from "./services/status.service.js";
import LoadingComponent from "./components/loading.component.js";
import LoadingService from "./services/loading.service.js";
import InfoComponent from "./components/info.component.js";

import Helpers from "./handleBars/helpers.js";

import HeaderButtonsComponent from "./components/headerButtons.component.js";
import TasksComponent from "./components/tasks.component.js";
import FormComponent from "./components/form.component.js";

import LoginComp from "./components/login.component.js";
import UserService from "./services/userService.js";
import { env } from "../../new_env.js";

class App {
  constructor() {
    this.handleBars_helpers = Helpers;
    this.loadingStatus = [];

    if (env.testAccount) {
      LoginComp.init(this);
    } else {
      UserService.id = "123456789";
      this.initialize();
    }
  }

  initialize() {
    LoadingComponent.initialize();
    StatusService.initialize().then((userData) => {
      this.checkTheme(userData.theme);
      this.checkLoading();
    });
    TaskService.initialize().then(() => this.checkLoading());
    StatusService.addObserver(this);
    this.loadingService = LoadingService;
  }

  checkLoading() {
    this.loadingStatus.push(1);
    if (this.loadingStatus.length === 2) {
      this.startApplication();
    }
  }

  startApplication() {
    this.loadingService.stateChange(false);
    this.infoComponent = new InfoComponent(this);
    this.infoComponent.initialize();
    this.tasksComponent = new TasksComponent(this);
    this.tasksComponent.initialize();
    this.HeaderButtonsComponent = new HeaderButtonsComponent(this);
    this.HeaderButtonsComponent.initialize();
    this.FormComponent = new FormComponent();
  }

  ObsStatus(data) {
    console.log("status observer", data);
    this.checkTheme(data.userData.theme);
  }

  checkTheme(theme = "light") {
    if (this.theme !== theme) {
      this.theme = theme;
      document.body.classList.remove("darkTheme", "lightTheme");
      document.body.classList.add(`${theme}Theme`);
    }
  }
}

const AppComponent = new App();
export default AppComponent;
