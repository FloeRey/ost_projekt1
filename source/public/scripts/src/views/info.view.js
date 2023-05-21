export default class InfoView {
  constructor(container, template) {
    this.container = container;
    this.template = template;
  }

  render(workMode, model) {
    this.container.innerHTML = "";
    this.container.innerHTML = this.template({
      infoText: `${model.text} ${workMode}`,
      workMode,
      theme: model.userData.theme,
    });
  }
}
