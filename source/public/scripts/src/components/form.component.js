import BaseComponent from "./base.component.js";
import FormView from "../views/form.view.js";
import FormModel from "../models/form.model.js";
import TaskService from "../services/task.service.js";
import LoadingService from "../services/loading.service.js";
import StatusService from "../services/status.service.js";

export default class FormComponent extends BaseComponent {
  constructor(app) {
    super(app);
    this.statusService = StatusService;
    this.loadingService = LoadingService;
    this.taskService = TaskService;
    this.statusService.addObserver(this);
    this.formModel = FormModel;
    this.container = this.getElement();
    this.formTemplate = this.template();
    this.formView = new FormView(this.container, this.formTemplate);
    this.container.addEventListener("submit", this);
    this.container.addEventListener("click", this);
    this.datePicker = document.querySelector("#inputDatePicker");
  }

  OnSubmit(e) {
    e.preventDefault();
    this.formData = document.getElementById("formCreate");

    this.uploadData();
  }

  async uploadData() {
    try {
      if (this.editTask) {
        await this.taskService.editTask(
          this.formData,
          this.editTask.id,
          this.editTask.generatteDate
        );
      } else {
        await this.taskService.createNewTask(this.formData);
      }
      this.statusService.homeView();
    } catch (e) {
      console.warn(e);
    }
  }

  OnclickButton(e) {
    if (e.target.id === "cancel") {
      this.statusService.homeView();
    }
    if (e.target.id === "datePicker") {
      this.datePicker.click();
    }

    if (e.target.classList.contains("importance")) {
      const list = e.target.classList.value;
      this.handleImportance(list);
    }
  }

  handleImportance(list) {
    let match = list.match(/importance_[0-9]{1,2}/);
    match = match[0].replace("importance_", "");
    Array.from(document.querySelectorAll(".importance")).map(
      (e, i) => (e.checked = i < match)
    );
    document.querySelector("#importance").value = match;
  }

  renderForm() {
    this.app.events.pageChanged(this, true);
    this.formView.render(this.formModel, this.editTask);
  }

  hideForm() {
    this.app.events.pageChanged(this, false);
    // this.formView.hide();
  }

  ObsStatus(data) {
    if (this.createTask !== data.createTask) {
      this.createTask = data.createTask;
      if (data.edit) {
        this.editTask = this.taskService.getTaskById(data.edit);
      } else {
        this.editTask = null;
      }
      if (data.createTask) this.renderForm();
      if (!data.createTask) this.hideForm();
    }
  }
}
