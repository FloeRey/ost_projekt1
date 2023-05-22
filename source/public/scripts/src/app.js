import TaskService from "./services/task.service.js";
import StatusService from "./services/status.service.js";
import LoadingComponent from "./components/loading.component.js";
import LoadingService from "./services/loading.service.js";
import InfoComponent from "./components/info.component.js";

import Helpers from "./handleBars/helpers.js";

import HeaderButtonsComponent from "./components/headerButtons.component.js";
import TasksComponent from "./components/tasks.component.js";
import FormComponent from "./components/form.component.js";

import UserService from "./services/userService.js";
import { env } from "../../new_env.js";

class App {
  constructor() {
    this.handleBars_helpers = Helpers;
    this.loadingStatus = [];

    if (env.testAccount) {
      UserService.id = "123456789";
      this.#start();
    } else {
      this.#startWithLogin();
    }
  }

  #startWithLogin() {
    this.login = document.querySelector("#login");
    this.login.style.cssText = `position:absolute;top:0;left:0;height:100%;`;
    this.login.innerHTML =
      "<div><form id='loginForm'><input name='name' type='text' autocomplete='username' placeholder='name'><input name='password' type='password' placeholder='password' autocomplete='current-password' ><button type='button' id='submit' >login</button> <button type='button' id='create' >createNew</button><br> <input name='key' placeholder='magicKey'></form></div><div id='info_login'></div>";

    this.login.removeAttribute("hidden");
    const createButton = document.querySelector("#create");
    const submitButton = document.querySelector("#submit");
    const info = document.querySelector("#info_login");

    submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      UserService.checkLogin()
        .then(() => {
          this.login.innerHTML = "";
          this.login.setAttribute("hidden", "true");
          this.#start();
        })
        .catch((error) => {
          info.innerHTML = error.error;
        });
    });

    createButton.addEventListener("click", (e) => {
      e.preventDefault();
      UserService.createNew()
        .then(() => {
          info.innerHTML = "created - try to log in";
        })
        .catch((error) => {
          info.innerHTML = error.error;
        });
    });
  }

  #start() {
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
