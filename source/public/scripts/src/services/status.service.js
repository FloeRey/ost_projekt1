import BaseService from "./base.service.js";

import _UserData_ from "./utils/userData.js";

import { URLS, env } from "../../../new_env.js";

class StatusService extends BaseService {
  constructor() {
    super();
    this.observers = [];
    this.status = {};
    this.userData = new _UserData_();
    this.workMode = env.MODE;
  }

  get getData() {
    return this.userData;
  }

  get readState() {
    return this.status;
  }

  get readFromLocal() {
    const userOptions = localStorage.getItem("settings");
    if (!userOptions) return this.userData;
    return this.userData.addSettings(userOptions);
  }

  async initialize() {
    if (this.workMode === "offline") {
      return this.readFromLocal;
    }
    try {
      const userOptions = await this.httpRequest(
        "POST",
        URLS.users.getUserSettings,
        {
          userID: env.userID,
        }
      );
      this.userData.addSettings(userOptions);
      return this.userData;
    } catch (e) {
      return this.userData;
    }
  }

  set mode(mode) {
    this.workMode = mode;
    env.MODE = mode;
  }

  get mode() {
    return this.workMode;
  }

  changeTheme() {
    this.userData.theme = this.userData.theme === "dark" ? "light" : "dark";
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

export default new StatusService();
