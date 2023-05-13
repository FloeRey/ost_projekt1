export default class LoadingView {
  constructor(container, template) {
    this.container = container;
    this.template = template;
  }

  show(data) {
    console.log("show data", data.onlyContent);
    if (!data.onlyContent) {
      this.container.classList.add("isShow");
    }
    console.log(data);
    this.container.innerHTML = "";
    this.container.innerHTML = this.template({
      text: data.override ? data.override : data.text,
      addText: data.addText,
      beforeText: data.beforeText,
    });
  }

  remove() {
    this.container.classList.remove("isShow");
  }
}
