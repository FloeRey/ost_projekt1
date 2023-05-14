import PubSub from "../utils/pubSub.js";

export default class TasksController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.PubSub = PubSub;
    this.PubSub.subscribe("createNewTask", this.createNewTask.bind(this));
    this.renderAllTasks();
  }

  async renderAllTasks() {
    await this.model.getTasks();
    this.view.renderTasks(this.model);
  }

  createNewTask() {
    this.view.hideTaskList();
  }

  initialize() {
    this.view.OnEditTask((taskId) => {
      const task = this.model.getTaskFromId(taskId);
      this.view.hideTaskList();
      this.PubSub.publish("editTask", task);
    });
  }
}
