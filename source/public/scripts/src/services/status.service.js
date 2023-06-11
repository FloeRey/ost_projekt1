import BaseService from "./base.service.js";
// import _UserData_ from "./utils/userData.js";
import { URLS, env } from "../../../new_env.js";

class StatusService extends BaseService {
  constructor() {
    super();
    this.observers = [];
    this.status = {};
    this.workMode = env.MODE;
  }

  get readState() {
    return this.status;
  }

  set mode(mode) {
    this.workMode = mode;
    env.MODE = mode;
  }

  get mode() {
    return this.workMode;
  }

  set setTheme(data) {
    this.theme = data;
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

  updateTheme(theme) {
    this.theme = theme;
    this.update(this);
  }
}

export default new StatusService();
