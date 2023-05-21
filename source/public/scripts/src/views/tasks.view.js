export default class TasksView {
  constructor(container, template) {
    this.container = container;
    this.template = template;
  }

  renderTasks(tasks) {
    this.container.innerHTML = "";
    tasks.forEach((task, index) => {
      const renderedTaskEntry = this.template({ task, index });
      this.container.insertAdjacentHTML("afterbegin", renderedTaskEntry);
    });
  }
}
