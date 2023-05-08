export default class HeaderButtonsView {
  constructor(container, template) {
    this.container = container;
    this.template = template;
  }

  hide() {
    this.container.innerHTML = "";
  }

  render(data) {
    console.log(data);
    this.container.innerHTML = "";
    this.container.innerHTML = this.template({
      filterButtons: data.HeaderButtons,
    });
  }
}
