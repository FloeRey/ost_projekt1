import BaseService from "./base.service.js";
import FormModel from "../models/form.model.js";
import taskHelper from "./taskHelpers.service.js";
import LottieService from "./lottieService.js";
import StatusService from "./status.service.js";
import _TaskData_ from "./utils/taskData.js";
import { env, URLS } from "../../../env.js";

class TaskService extends BaseService {
  constructor() {
    super();
    this.observers = [];
    this.tasks = [];
    this.hideTasks = [];
    this.filter = {};
    this.formModel = FormModel;
    this.notUploadedTasks = [];
    this.workMode = env.MODE;
    this.statusService = StatusService;
    this.offlineKeyWord = "offline";
    this.onlineKeyWord = "online";
  }

  get allTask() {
    return this.tasks;
  }

  async initialize() {
    this.workMode = this.statusService.mode;
    await this.fetchTasks();
    this.getPendingfromLocalStorage();
    if (env.usePollingUpdate) this.#startPolling();
  }

  async #startPolling() {
    if (!this.isOnPolling) {
      this.isOnPolling = true;
      await Promise.all([this.fetchTasks()]);
      this.update(this);
      setTimeout(() => {
        this.isOnPolling = false;
        this.#startPolling();
      }, 10000);
    }
  }

  async failUploads() {
    if (this.workMode !== this.offlineKeyWord) {
      try {
        this.notUploadedTasks.map(async (task) => {
          const { id } = task;
          await this.httpRequest("POST", URLS.tasks.updateTask, task);
          this.notUploadedTasks.splice(this.notUploadedTasks.indexOf(id));
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn("can not upload pendent localStorage tasks to DB");
      }
    }
  }

  getPendingfromLocalStorage() {
    if (localStorage.pending) {
      this.notUploadedTasks = JSON.parse(localStorage.pending);
    }
  }

  addToLocalPending(task) {
    this.notUploadedTasks.unshift(task);
    localStorage.setItem("pending", JSON.stringify(this.notUploadedTasks));
  }

  getFromLocalStorage() {
    if (localStorage.myTasks) {
      const storage = JSON.parse(localStorage.myTasks);
      this.tasks = storage.map((task) => _TaskData_.fromJSON(task));
    }
  }

  #addToLocalStorage() {
    if (this.tasks.length > 0)
      localStorage.setItem("myTasks", JSON.stringify(this.tasks));
  }

  async editTask(form, taskId, generateDate) {
    const editTask = _TaskData_.fromJSON(
      this.formModel.createTask(form, taskId, generateDate)
    );
    if (this.workMode === this.onlineKeyWord) {
      await this.httpRequest("POST", URLS.tasks.editTask, editTask);
    }

    this.replaceLocalStorage(editTask, taskId);
  }

  async createNewTask(form) {
    const newTask = _TaskData_.fromJSON(this.formModel.createTask(form));
    if (this.workMode === this.onlineKeyWord) {
      try {
        await this.httpRequest("POST", URLS.tasks.updateTask, newTask);
      } catch (e) {
        if (
          // eslint-disable-next-line no-alert
          window.confirm(
            "not able to upload, store in local or try again with cancel"
          ) === false
        ) {
          throw new Error("not updated in localStorage");
        }
      }
    }
    this.tasks.push(newTask);
    this.#addToLocalStorage(newTask);
    LottieService.fireOneAnimation();
  }

  async fetchTasks() {
    if (this.workMode === this.offlineKeyWord) {
      this.getFromLocalStorage();
    } else {
      try {
        const response = await this.httpRequest("GET", URLS.tasks.getTask);
        this.tasks = response.map((task) => _TaskData_.fromJSON(task));
        this.#addToLocalStorage();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn("no access to db, working with localStorage");
        this.getFromLocalStorage();
        this.changeWorkMode(this.offlineKeyWord);
      }
    }
  }

  get hasCompleteOne() {
    return this.tasks.some((task) => task.complete);
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

  changeWorkMode(mode) {
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

  replaceLocalStorage(editTask, taskId) {
    this.tasks[this.tasks.findIndex((task) => task.id === taskId)] = editTask;
    localStorage.setItem("myTasks", JSON.stringify(this.tasks));
  }

  deleteLocalStorage(taskId) {
    const index = this.tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      localStorage.setItem("myTasks", JSON.stringify(this.tasks));
    }
  }

  getTaskById(taskId) {
    if (taskId) return this.tasks.find((task) => task.id === taskId);
    return null;
  }

  async removeTask(taskId) {
    if (this.workMode === this.onlineKeyWord) {
      try {
        this.tasks = await this.httpRequest("DELETE", URLS.tasks.deleteTask, {
          id: taskId,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn("something happend when trying to remove your task");
      }
    }
    this.deleteLocalStorage(taskId);
    this.#addToLocalStorage();
    this.update();
  }

  async toggleComplete(taskId) {
    this.ls_markComplete(taskId);
    if (this.workMode === this.onlineKeyWord) {
      await this.httpRequest("post", URLS.tasks.completeTask, {
        id: taskId,
      });
    }
  }
}

Object.assign(TaskService.prototype, taskHelper);

export default new TaskService();
