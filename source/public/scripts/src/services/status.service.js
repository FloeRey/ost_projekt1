import BaseService from "./base.service.js";

export default class StatusService extends BaseService {
  constructor() {
    super();
    this.observers = [];
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
