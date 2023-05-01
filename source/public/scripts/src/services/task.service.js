import BaseService from "./base.service.js";
import TaskModel from "../models/task.js";

export default class TaskService extends BaseService {
  constructor() {
    super();
    this.tasks = [];
  }

  async fetchTasks() {
    try {
      const response = await this.httpRequest(
        "GET",
        "http://localhost:3000/task"
      );
      this.workMode = "db";
      this.tasks = response.map((task) => TaskModel.fromJSON(task));
    } catch (e) {
      console.warn("no access to db, working with localStorage");
      this.workMode = "local";
      if (localStorage.myTasks) {
        const storage = JSON.parse(localStorage.myTasks);
        this.tasks = storage.map((task) => TaskModel.fromJSON(task));
      }
    }
  }
}
