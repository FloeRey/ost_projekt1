import BaseComponent from "./base.component.js";
import ServiceRegistry from "../services/serviceRegistry.js";

import LoadingModel from "../models/loading.model.js";
import LoadingView from "../views/loading.view.js";

export default class LoadingComponent extends BaseComponent {
  constructor(app) {
    super(app);
    this.loadingService = ServiceRegistry.getService("loadingService");
    this.loadingService.addObserver(this);
    this.loadingModel = LoadingModel;
  }

  initialize() {
    this.container = this.getElement();
    this.loadingTemplate = this.template();
    this.container.addEventListener("mouseenter", this);
    this.container.addEventListener("mouseleave", this);
    this.dotdotUp = document.querySelector(".dotdotUp");
    this.loadingView = new LoadingView(this.container, this.loadingTemplate);
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
      this.container.classList.add("loadingZoom");
  }

  mouseLeave() {
    if (this.loadingModel.isLoading)
      this.container.classList.remove("loadingZoom");
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
      this.loadingView.show(data);
    } else {
      this.stopInterval();
      this.loadingView.remove();
    }
  }
}
