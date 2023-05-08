export default class FormView {
  constructor(container, template) {
    this.container = container;
    this.template = template;
  }

  hide() {
    this.container.innerHTML = "";
  }

  render(data) {
    this.container.innerHTML = "";
    this.container.innerHTML = this.template({
      formData: data.formData,
    });
  }
}
