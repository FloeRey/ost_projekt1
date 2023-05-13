import BaseService from "./base.service.js";
import TaskModel from "../models/task.model.js";
import FormModel from "../models/form.model.js";

export default class TaskService extends BaseService {
  constructor() {
    super();
    this.observers = [];
    this.tasks = [];
    this.formModel = FormModel;
    this.notUploadedTasks = [];
    this.url = {
      getTask: "http://localhost:3000/task",
      updateTask: "http://localhost:3000/task",
      editTask: "http://localhost:3000/task/edit",
      deleteTask: "http://localhost:3000/task/",
    };
  }

  async initialize() {
    await this.fetchTasks();
    return this.tasks;
  }

  update() {
    console.log(this.observers.length);
    if (this.observers.length > 0) {
      this.observers.forEach((observer) => {
        if (observer.ObsTasks) {
          observer.ObsTasks(this.tasks);
        }
      });
    }
  }

  setWorkMode(mode) {
    if (this.workMode !== mode) {
      this.workMode = mode;
      if (this.observers.length > 0) {
        this.observers.forEach((observer) => {
          if (observer.changeTasksMode) {
            observer.changeTasksMode(this.workMode);
          }
        });
      }
    }
  }

  getFromLocalStorage() {
    if (localStorage.myTasks) {
      const storage = JSON.parse(localStorage.myTasks);
      this.tasks = storage.map((task) => TaskModel.fromJSON(task));
    }
  }

  addToLocalStorage(task) {
    localStorage.setItem("myTasks", JSON.stringify(this.tasks));
  }

  replaceLocalStorage(editTask, taskId) {
    console.log(this.tasks.findIndex((task) => task.id === taskId));
    console.log(this.tasks);
    this.tasks[this.tasks.findIndex((task) => task.id === taskId)] = editTask;
    localStorage.setItem("myTasks", JSON.stringify(this.tasks));
  }

  deleteLocalStorage(taskId) {
    const index = this.tasks.findIndex((task) => task.id === taskId);
    this.tasks.splice(index, 1);

    localStorage.setItem("myTasks", JSON.stringify(this.tasks));
  }

  addToLocalPending(task) {
    this.notUploadedTasks.unshift(task);
    localStorage.setItem("pending", JSON.stringify(this.notUploadedTasks));
    this.checkPending();
  }

  getFromLocalPending() {
    if (localStorage.pending) {
      this.notUploadedTasks = JSON.parse(localStorage.pending);
    }
    this.checkPending();
  }

  async checkPending() {
    console.log(this.notUploadedTasks);

    if (!this.isOnCheck) {
      this.isOnCheck = true;
      try {
        await Promise.all(
          this.notUploadedTasks.map(async (task) => {
            const { id } = task;
            console.log(task);
            await this.httpRequest("POST", this.url.updateTask, task);
            console.log("success");
            this.notUploadedTasks.splice(this.notUploadedTasks.indexOf(id));
          })
        );
        if (this.notUploadedTasks.length === 0) {
          clearInterval(this.pendingInterval);
        } else if (!this.pendingInterval) {
          this.pendingInterval = setInterval(() => {
            console.log("check pending");
            this.checkPending();
          }, 5000);
        }
        //  await this.httpRequest("POST", "http://localhost:3000/task2", task);
      } catch (e) {
        console.log(e);
      }
      console.log("=> false");
      this.isOnCheck = false;
    }
  }

  failUpload(newTask) {
    this.addToLocalPending(newTask);
  }

  getTaskById(taskId) {
    if (taskId) return this.tasks.find((task) => task.id === taskId);
    return null;
  }

  async removeTask(taskId) {
    try {
      this.tasks = await this.httpRequest("DELETE", this.url.deleteTask, {
        id: taskId,
      });
      this.update();
    } catch (e) {
      console.log(e);
    }
    this.deleteLocalStorage(taskId);
  }

  async editTask(form, taskId) {
    const editTask = TaskModel.fromJSON(
      this.formModel.createTask(form, taskId)
    );
    if (this.workMode === "local") {
      this.replaceLocalStorage(editTask, taskId);
    } else {
      try {
        await this.httpRequest("POST", this.url.editTask, editTask);
      } catch (e) {
        console.log(e);
      }
      this.replaceLocalStorage(editTask, taskId);
    }
  }

  async createNewTask(form) {
    const newTask = TaskModel.fromJSON(this.formModel.createTask(form));

    this.addToLocalStorage(newTask);
    this.tasks.push(newTask);

    if (this.workMode === "local") {
      console.warn(
        "you are in localStorage mode - refresh to try a connection to db"
      );
    } else {
      try {
        await this.httpRequest("POST", this.url.updateTask, newTask);
        // this.tasks.push(newTask);
      } catch (e) {
        this.failUpload(newTask);
      }
    }
  }

  async fetchTasks() {
    try {
      const response = await this.httpRequest("GET", this.url.getTask);
      this.setWorkMode("db");
      this.tasks = response.map((task) => TaskModel.fromJSON(task));
    } catch (e) {
      console.warn("no access to db, working with localStorage");
      this.setWorkMode("local");
      this.getFromLocalStorage();
    }
    console.log("chekcPending");
    this.getFromLocalPending();
  }
}
