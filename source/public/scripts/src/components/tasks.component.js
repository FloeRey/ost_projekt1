import BaseComponent from "./base.component.js";

export default class TasksComponent extends BaseComponent {
  constructor(app) {
    super(app);
    this.taskService = app.taskService;
    this.loadingService = app.loadingService;
  }

  async initialize() {
    await this.taskService.fetchTasks();
    this.renderTasks();
    this.loadingService.stateChange(false);
  }

  renderTasks() {
    this.container = this.getElement("tasks");
    this.container.innerHTML = "";
    const taskTemplate = this.template("tasks");
    this.taskService.tasks.forEach((task) => {
      const renderedTaskEntry = taskTemplate({ task });
      this.container.insertAdjacentHTML("beforeend", renderedTaskEntry);
    });
  }
}
