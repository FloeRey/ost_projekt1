import BaseService from "./base.service.js";
import TaskModel from "../models/task.model.js";
import FormModel from "../models/form.model.js";

export default class TaskService extends BaseService {
  constructor() {
    super();
    this.tasks = [];
    this.formModel = FormModel;
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

  async createNewTask(form) {
    const newTask = TaskModel.fromJSON(this.formModel.createTask(form));
    console.log(newTask);
    this.tasks.unshift(newTask);
    localStorage.setItem("myTasks", JSON.stringify(this.tasks));
    if (this.workMode === "local") {
      console.warn(
        "you are in localStorage mode - refresh to try a connection to db"
      );
    } else {
      try {
        await this.httpRequest("POST", "http://localhost:3000/task", newTask);
      } catch (e) {
        console.log(e);
        console.warn("no access to db, working with localStorage");
      }
    }
  }
}
