export default class LoadingView {
  constructor(container, template) {
    this.container = container;
    this.template = template;
  }

  show(data) {
    if (!data.onlyContent) {
      this.container.classList.add("is-show");
    }

    this.container.innerHTML = "";
    this.container.innerHTML = this.template({
      text: data.override ? data.override : data.text,
      addText: data.addText,
      beforeText: data.beforeText,
    });
  }

  remove() {
    this.container.classList.remove("is-show");
  }
}
