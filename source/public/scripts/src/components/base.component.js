export default class BaseComponent {
  constructor(app) {
    this.app = app;
  }

  get componentName() {
    let name = this.constructor.name.replace("Component", "");
    name = name.charAt(0).toLowerCase() + name.slice(1);
    return name;
  }

  get componentId() {
    return `#${this.componentName}`;
  }

  getElement(name) {
    if (name) return document.querySelector(`#${name}`);
    return document.querySelector(this.componentId);
  }

  template(name) {
    const templateName = name
      ? `#${name}-template`
      : `#${this.componentName}-template`;
    return Handlebars.compile(document.querySelector(templateName).innerHTML);
  }

  handleEvent(e) {
    switch (e.type) {
      case "click":
        this.OnclickButton(e);
        break;
      case "submit":
        this.OnSubmit(e);
        break;
      default:
        break;
    }
  }
}
