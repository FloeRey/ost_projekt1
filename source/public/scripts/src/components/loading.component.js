import BaseComponent from "./base.component.js";
import LoadingModel from "../models/loading.model.js";
import LoadingView from "../views/loading.view.js";
import LoadingService from "../services/loading.service.js";

class LoadingComponent extends BaseComponent {
  constructor(app) {
    super(app);
    this.loadingService = LoadingService;
    this.loadingService.addObserver(this);
    this.loadingModel = LoadingModel;
    this.container = this.getElement();
    this.loadingTemplate = this.template();
    this.container.addEventListener("mouseenter", this);
    this.container.addEventListener("mouseleave", this);
    this.loadingView = new LoadingView(this.container, this.loadingTemplate);
  }

  initialize() {
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
    if (this.loadingModel.isLoading)
      this.container.classList.add("loading-zoom");
  }

  mouseLeave() {
    if (this.loadingModel.isLoading)
      this.container.classList.remove("loading-zoom");
  }

  startInterval() {
    this.stopInterval();
    this.interval = setInterval(() => {
      this.loadingService.updateContent();
    }, 1000);
  }

  stopInterval() {
    clearInterval(this.interval);
    this.beforeText = "";
    this.addText = "";
  }

  ObsLoading(data) {
    if (data.isLoading) {
      this.loadingView.show(data, data.override);
    } else {
      this.stopInterval();
      this.loadingView.remove();
    }
  }
}

export default new LoadingComponent();
