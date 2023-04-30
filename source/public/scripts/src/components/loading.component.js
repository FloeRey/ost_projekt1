import BaseComponent from "./base.component.js";

export default class LoadingComponent extends BaseComponent {
  constructor(app) {
    super(app);
    this.loadingService = app.loadingService;
    this.loadingService.addObserver(this);
    this.text = "loading";
  }

  initialize() {
    this.container = this.getElement("loading");
    this.loadingTemplate = this.template("loading");
    this.container.addEventListener("mouseenter", this);
    this.container.addEventListener("mouseleave", this);
    this.container.addEventListener("transitionend", () => {
      if (!this.loadingService.isLoading) {
        this.container.classList.add("hidden");
      }
    });
    this.loadingService.stateChange(true);
    this.startInterval();
  }

  handleEvent(e) {
    e.stopPropagation();
    switch (e.type) {
      case "mouseenter":
        this.mouseEnter(e.target);
        break;
      case "mouseleave":
        this.mouseLeave(e.target);
        break;
      default:
        break;
    }
  }

  mouseEnter() {
    if (this.loadingService.isLoading)
      this.container.classList.add("loadingZoom");
  }

  mouseLeave() {
    if (this.loadingService.isLoading)
      this.container.classList.remove("loadingZoom");
  }

  startInterval() {
    this.stopInterval();
    this.interval = setInterval(() => {
      if (!this.addText) this.addText = "";
      if (!this.beforeText) this.beforeText = "";
      if (this.addText.length < this.text.length) {
        this.addText += ".";
      } else if (this.beforeText.length < this.text.length) {
        this.beforeText += ".";
      } else {
        this.beforeText = "";
        this.addText = "";
      }
      this.loadingService.onlyContent = true;
      this.renderLoadingView(this.loadingService);
    }, 1000);
  }

  stopInterval() {
    clearInterval(this.interval);
    this.beforeText = "";
    this.addText = "";
  }

  renderLoadingView(data) {
    if (data.isLoading) {
      if (!data.onlyContent) {
        this.container.classList.remove("hidden");

        setTimeout(() => {
          this.container.classList.add("isShow");
        }, 100);
      }
      this.container.innerHTML = "";
      this.container.innerHTML = this.loadingTemplate({
        text: this.text,
        addText: this.addText,
        beforeText: this.beforeText,
      });
    } else {
      this.stopInterval();
      this.container.classList.remove("loadingZoom");
      this.container.classList.remove("isShow");
    }
  }
}
