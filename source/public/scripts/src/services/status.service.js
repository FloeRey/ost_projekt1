import BaseService from "./base.service.js";
import env from "../../../../env.js";
import _UserData_ from "./utils/userData.js";

class StatusService extends BaseService {
  constructor() {
    super();
    this.observers = [];
    this.status = {};
    this.userData = new _UserData_();
    this.url = {
      getUserSettings: `${env.baseUrl}/user/getUserData`,
    };
  }

  get getData() {
    return this.userData;
  }

  get readState() {
    return this.status;
  }

  async initialize() {
    try {
      const userOptions = await this.httpRequest(
        "POST",
        this.url.getUserSettings,
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
