import Task from "./helpers/task.format.js";
import env from "../../env.js";

import BaseService from "../services/base.service.js";

export default class TasksModel extends BaseService {
  constructor() {
    super();
    this.tasks = [];
    this.url = {
      getAllTasks: `${env.baseUrl}/task/getAllTasks`,
    };
  }

  getTaskFromId(taskId) {
    if (taskId) return this.tasks.find((task) => task.id === taskId);
    return null;
  }

  async getTasks() {
    try {
      const response = await this.httpRequest("GET", this.url.getAllTasks);
      console.log(response);
      this.tasks = response.map((task) => Task.fromJSON(task));
    } catch (e) {
      console.log(e);
    }
  }
}
