import BaseComponent from "./base.component.js";
import ServiceRegistry from "../services/serviceRegistry.js";
import FormView from "../views/form.view.js";
import FormModel from "../models/form.model.js";

export default class FormComponent extends BaseComponent {
  constructor() {
    super();
    this.statusService = ServiceRegistry.getService("statusService");
    this.taskService = ServiceRegistry.getService("taskService");
    this.statusService.addObserver(this);

    this.formModel = FormModel;
    this.createTask = false;
    this.editTask = false;
  }

  initialize() {
    this.container = this.getElement();
    this.formTemplate = this.template();

    Handlebars.registerHelper("times", (n, block) => {
      let accum = "";
      for (let i = 0; i < n; ++i) accum += block.fn(i);
      return accum;
    });
    Handlebars.registerHelper("add", (a, b) => a + b);
    Handlebars.registerHelper("eq", (a, b) => a === b);

    this.formView = new FormView(this.container, this.formTemplate);
    this.container.addEventListener("submit", this);
  }

  OnSubmit(e) {
    e.preventDefault();
    this.formData = document.getElementById("formCreate");

    this.taskService.createNewTask(this.formData);
  }

  renderForm() {
    this.formView.render(this.formModel);
  }

  hideForm() {
    this.formView.hide();
  }

  ObsStatus(data) {
    console.log(data.createTask);
    if (this.createTask !== data.createTask) {
      this.createTask = data.createTask;
      if (data.createTask) this.renderForm(data);
      if (!data.createTask) this.hideForm();
    }
  }
}
