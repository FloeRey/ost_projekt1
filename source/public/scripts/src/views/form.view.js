export default class FormView {
  constructor(container, template) {
    this.container = container;
    this.template = template;
  }

  hide() {
    this.container.innerHTML = "";
  }

  render(data, editTask) {
    this.container.innerHTML = "";

    this.container.innerHTML = this.template({
      formData: data.formData,
      editTask,
      title: editTask ? "EDIT TASK" : "CREATE NEW TASK",
    });
  }
}
