import BaseView from "../views/base.view.js";

import PubSub from "../utils/pubSub.js";

export default class FormComponent extends BaseView {
  constructor() {
    super();
    this.container = this.getElement();
    this.template = this.getTemplate();
    this.helpers = [];

    this.handleBarHelpers();
    this.createText = "create new task";
    this.formData = {
      createText: "create new task",
      description: "description",
      importance: "importance",
      dueData: "dueDate",
    };

    PubSub.subscribe("createNewTask", this.showForm.bind(this));
    PubSub.subscribe("editTask", this.showForm.bind(this));
  }

  handleBarHelpers() {
    this.helpers.push(
      Handlebars.registerHelper("times", (n, block) => {
        let accum = "";
        for (let i = 0; i < n; ++i) accum += block.fn(i);
        return accum;
      }),
      Handlebars.registerHelper("add", (a, b) => a + b),
      Handlebars.registerHelper("eq", (a, b) => a === b),
      Handlebars.registerHelper("selected", (option, value) => {
        if (option + 1 === value) {
          return "selected";
        }
        return "";
      })
    );
  }

  showForm(data) {
    console.log(data);
    this.container.innerHTML = "";
    this.container.innerHTML = this.template({
      formData: this.formData,
      editTask: data,
    });
  }
}
