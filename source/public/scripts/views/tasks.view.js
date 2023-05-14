import BaseView from "./base.view.js";

export default class TasksView extends BaseView {
  constructor() {
    super();
    this.container = this.getElement();
    this.template = this.getTemplate();

    this.container.addEventListener("click", this);
  }

  hideTaskList() {
    this.container.innerHTML = "";
  }

  OnclickButton(e) {
    if (e.target.classList.contains("editTask")) {
      const taskId = e.target.parentNode.getAttribute("data-id");
      this.onEditCallback(taskId);
      //  this.PubSub.publish("editTask", { id: taskId });
    }
  }

  OnEditTask(callback) {
    this.onEditCallback = callback;
  }

  renderTasks(data) {
    this.container.innerHTML = "";

    data.tasks.forEach((task) => {
      const renderedTaskEntry = this.template({ task });
      this.container.insertAdjacentHTML("afterbegin", renderedTaskEntry);
    });
  }
}
