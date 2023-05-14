import BaseService from "./base.service.js";
import TaskModel from "../models/task.model.js";
import FormModel from "../models/form.model.js";

export default class TaskService extends BaseService {
  constructor() {
    super();
    this.observers = [];
    this.tasks = [];
    this.hideTasks = [];
    this.filter = {};
    this.formModel = FormModel;
    this.notUploadedTasks = [];
    this.url = {
      getTask: "http://localhost:3000/task",
      updateTask: "http://localhost:3000/task",
      editTask: "http://localhost:3000/task/edit",
      completeTask: "http://localhost:3000/task/complete",
      deleteTask: "http://localhost:3000/task/",
    };
  }

  async initialize() {
    await this.fetchTasks();
  }

  update() {
    if (this.observers.length > 0) {
      this.observers.forEach((observer) => {
        if (observer.ObsTasks) {
          observer.ObsTasks(this.tasks);
        }
      });
    }
  }

  toggleCompleteTasks(onOff) {
    this.tasks.forEach((task) => {
      if (task.complete) {
        if (onOff === 1) {
          // eslint-disable-next-line no-param-reassign
          task.hideTask = true;
        } else {
          // eslint-disable-next-line no-param-reassign
          task.hideTask = false;
        }
      }
    });
    this.update();
  }

  sort(filterType, direction) {
    switch (filterType) {
      case "name_filter":
        this.tasks.sort((a, b) =>
          direction === 1
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        );
        break;
      case "date_filter":
        this.tasks.sort((a, b) => {
          if (!a.dueDate) return -1;
          return direction === 1
            ? new Date(a.dueDate) - new Date(b.dueDate)
            : new Date(b.dueDate) - new Date(a.dueDate);
        });
        break;
      case "creationDate_filter":
        this.tasks.sort((a, b) =>
          direction === 1
            ? b.generateDate - a.generateDate
            : a.generateDate - b.generateDate
        );
        break;
      case "importance_filter":
        this.tasks.sort((a, b) =>
          direction === 1
            ? b.importance - a.importance
            : a.importance - b.importance
        );
        break;
      case "completed_filter":
        this.tasks.forEach((task) => {
          if (task.complete) {
            if (direction === 1) {
              // eslint-disable-next-line no-param-reassign
              task.hideTask = true;
            } else {
              // eslint-disable-next-line no-param-reassign
              task.hideTask = false;
            }
          }
        });

        break;
      default:
        break;
    }
    this.update();
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
    this.tasks[this.tasks.findIndex((task) => task.id === taskId)] = editTask;
    localStorage.setItem("myTasks", JSON.stringify(this.tasks));
  }

  deleteLocalStorage(taskId) {
    const index = this.tasks.findIndex((task) => task.id === taskId);
    this.tasks.splice(index, 1);

    localStorage.setItem("myTasks", JSON.stringify(this.tasks));
  }

  updateLocalStorage(taskId) {
    const index = this.tasks.findIndex((task) => task.id === taskId);
    this.tasks[index].complete = !this.tasks[index].complete;

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
    if (!this.isOnCheck) {
      this.isOnCheck = true;
      try {
        await Promise.all(
          this.notUploadedTasks.map(async (task) => {
            const { id } = task;

            await this.httpRequest("POST", this.url.updateTask, task);

            this.notUploadedTasks.splice(this.notUploadedTasks.indexOf(id));
          })
        );
        if (this.notUploadedTasks.length === 0) {
          clearInterval(this.pendingInterval);
        } else if (!this.pendingInterval) {
          this.pendingInterval = setInterval(() => {
            this.checkPending();
          }, 5000);
        }
        //  await this.httpRequest("POST", "http://localhost:3000/task2", task);
      } catch (e) {
        console.log(e);
      }

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
    if (this.workMode === "db") {
      try {
        this.tasks = await this.httpRequest("DELETE", this.url.deleteTask, {
          id: taskId,
        });
        this.update();
      } catch (error) {
        console.log(error);
      }
    }
    this.deleteLocalStorage(taskId);
  }

  async toggleComplete(taskId) {
    if (this.workMode === "db") {
      try {
        await this.httpRequest("post", this.url.completeTask, {
          id: taskId,
        });
      } catch (error) {
        console.log(error);
      }
    }
    this.updateLocalStorage(taskId);
    this.update();
  }

  async editTask(form, taskId, generateDate) {
    const editTask = TaskModel.fromJSON(
      this.formModel.createTask(form, taskId, generateDate)
    );
    if (this.workMode === "local") {
      this.replaceLocalStorage(editTask, taskId);
    } else {
      try {
        await this.httpRequest("POST", this.url.editTask, editTask);
      } catch (error) {
        console.log(error);
      }
      this.replaceLocalStorage(editTask, taskId);
    }
  }

  async createNewTask(form) {
    const newTask = TaskModel.fromJSON(this.formModel.createTask(form));
    console.log(newTask);

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
      this.addToLocalStorage();
    } catch (e) {
      console.warn("no access to db, working with localStorage", e);
      this.setWorkMode("local");
      this.getFromLocalStorage();
    }

    this.getFromLocalPending();
  }
}
