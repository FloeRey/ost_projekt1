import BaseService from "./base.service.js";

import env from "../../../../env.js";

export default class StatusService extends BaseService {
  constructor() {
    super();
    this.observers = [];
    this.theme = env.theme;
    // this.showTasks = true;
    this.url = {
      getStatus: "http://localhost:3000/getStatus",
    };
  }

  async initialize() {
    await new Promise((resolve) => setTimeout(resolve, 50));

    /* try {
this.reponse = await this.httpRequest("GET", this.url.getStatus);
    } catch (e) {

    }

    this.theme =*/
    //this.update(this);
  }

  changeTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    this.update(this);
  }

  editTask(taskId) {
    this.showTasks = false;
    this.createTask = true;
    this.edit = taskId;
    this.update(this);
  }

  createNewTask() {
    this.showTasks = false;
    this.createTask = true;
    this.edit = null;
    this.update(this);
  }

  homeView() {
    this.showTasks = true;
    this.createTask = false;
    this.update(this);
  }

  update(data) {
    if (this.observers.length > 0) {
      this.observers.forEach((observer) => observer.ObsStatus(data));
    }
  }
}
