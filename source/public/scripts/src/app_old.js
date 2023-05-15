import TaskService from "./services/task.service.js";
import LoadingService from "./services/loading.service.js";
import StatusService from "./services/status.service.js";

import LoadingComponent from "./components/loading.component.js";
import HeaderButtonsComponent from "./components/headerButtons.component.js";
import TasksComponent from "./components/tasks.component.js";
import FormComponent from "./components/form.component.js";

import ServiceRegistry from "./services/serviceRegistry.js";

import InfoComponent from "./components/info.component.js";

class App {
  constructor() {
    this.initService();

    /* show loading screen */
    this.loadingComponent = new LoadingComponent();
    this.loadingComponent.initialize();

    /* check for theme mode on DB or LocalStorage */
    this.statusService.addObserver(this);

    Promise.all([
      this.statusService.initialize(),
      this.taskService.initialize(),
    ])
      .then(() => {
        this.registerHelpers();
        this.theme = this.statusService.theme;
        this.chooseTheme();

        this.startAppliaction();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  chooseTheme() {
    if (this.theme === "dark") {
      document.body.classList.add("darkTheme");
    } else {
      document.body.classList.remove("darkTheme");
    }
  }

  init() {}

  ObsStatus() {
    this.theme = this.userData.theme;
    this.chooseTheme();

    //  document.body.classList.add(status.theme);
  }

  startAppliaction() {
    /* show info */
    this.infoComponent = new InfoComponent();

    /* work with service registry dependency */
    // this.loadingComponent = new LoadingComponent();
    this.FormComponent = new FormComponent();

    /* work with full app component */
    this.HeaderButtonsComponent = new HeaderButtonsComponent(this);
    this.TasksComponent = new TasksComponent(this);

    this.HeaderButtonsComponent.initialize();
    this.FormComponent.initialize();
    this.TasksComponent.initialize();
    this.infoComponent.initialize();
  }

  initService() {
    this.taskService = new TaskService();
    this.loadingService = new LoadingService();
    this.statusService = new StatusService();
    /* create registry for all services */
    ServiceRegistry.addService("taskService", this.taskService);
    ServiceRegistry.addService("loadingService", this.loadingService);
    ServiceRegistry.addService("statusService", this.statusService);
  }

  registerHelpers() {
    Handlebars.registerHelper("times", (n, block) => {
      let accum = "";
      for (let i = 0; i < n; ++i) accum += block.fn(i);
      return accum;
    });
    Handlebars.registerHelper("add", (a, b) => a + b);
    Handlebars.registerHelper("eq", (a, b) => a === b);
    Handlebars.registerHelper("noteq", (a, b) => a !== b);
    Handlebars.registerHelper("or", (a, b) => a !== b);

    Handlebars.registerHelper("selected", (option, value) => {
      if (option + 1 === value) {
        return "selected";
      }
      return "";
    });
  }
}

//const AppComponent = new App();

console.log("add event listener");

document.addEventListener("DOMContentLoaded", () => new App());
