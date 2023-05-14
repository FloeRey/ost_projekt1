import PubSub from "../utils/pubSub.js";
import BaseView from "../views/base.view.js";

import AppstatusService from "../services/appstatus.service.js";

export default class HeaderButtons extends BaseView {
  constructor() {
    super();
    this.container = this.getElement();
    this.template = this.getTemplate();
    this.PubSub = PubSub;
    this.appstatusService = AppstatusService;
    this.appstatusService.addObserver(this);
    PubSub.subscribe("editTask", this.hide.bind(this));
    this.HeaderButtons = new Handlebars.SafeString(
      "<button id='backButton'>backButton</button><button id=''>button2</button>"
    );
  }

  initialize() {
    this.container.addEventListener("click", this);
    this.render();
  }

  render() {
    this.container.innerHTML = "";
    this.container.innerHTML = this.template({
      filterButtons: this.HeaderButtons,
    });
  }

  hide() {
    this.container.innerHTML = "";
  }

  ObsStatus(data) {}

  OnclickButton(e) {
    switch (e.target.id) {
      case "create":
        this.hide();
        this.PubSub.publish("createNewTask");
        //  this.statusService.createNewTask();
        break;
      default:
        break;
    }
  }
}
