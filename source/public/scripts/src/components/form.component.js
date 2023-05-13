import BaseComponent from "./base.component.js";
import ServiceRegistry from "../services/serviceRegistry.js";
import FormView from "../views/form.view.js";
import FormModel from "../models/form.model.js";

export default class FormComponent extends BaseComponent {
  constructor() {
    super();
    this.loadingService = ServiceRegistry.getService("loadingService");
    this.statusService = ServiceRegistry.getService("statusService");
    this.taskService = ServiceRegistry.getService("taskService");
    this.statusService.addObserver(this);

    this.formModel = FormModel;
    this.createTask = false;
    this.editTask = null;
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

    Handlebars.registerHelper("selected", (option, value) => {
      if (option + 1 === value) {
        return "selected";
      }
      return "";
    });

    this.formView = new FormView(this.container, this.formTemplate);
    this.container.addEventListener("submit", this);
    this.container.addEventListener("click", this);
  }

  OnSubmit(e) {
    e.preventDefault();
    this.formData = document.getElementById("formCreate");
    if (this.editTask) {
      this.loadingService.smallLoader(1);
      this.taskService
        .editTask(this.formData, this.editTask.id)
        .then(() => {
          console.log("successd edited");
          this.statusService.homeView();
        })
        .catch((error) => console.log(error))
        .finally(() => this.loadingService.smallLoader(0));
    } else {
      this.taskService
        .createNewTask(this.formData)
        .then(() => this.statusService.homeView())
        .catch((error) => console.log(error));
    }
  }

  OnclickButton(e) {
    console.log(e.type);
    if (e.target.id === "cancel") {
      this.statusService.homeView();
    }
  }

  renderForm() {
    this.formView.render(this.formModel, this.editTask);
  }

  hideForm() {
    this.formView.hide();
  }

  ObsStatus(data) {
    if (this.createTask !== data.createTask) {
      this.createTask = data.createTask;

      if (data.edit) {
        console.log("write edittask");
        this.editTask = this.taskService.getTaskById(data.edit);
      } else {
        this.editTask = null;
      }

      if (data.createTask) this.renderForm();
      if (!data.createTask) this.hideForm();
    }
  }
}
