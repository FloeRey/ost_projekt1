import LoadingModel from "../models/loading.model.js";
import BaseService from "./base.service.js";

class LoadingService extends BaseService {
  constructor() {
    super();
    this.observers = [];
    this.model = LoadingModel;
  }

  smallLoader(inOut) {
    if (inOut === 0) this.model.makeHide();
    if (inOut === 1) this.model.makeShow();
    this.model.override = "update";
    this.updateObserver(this.model);
  }

  stateChange(state) {
    if (this.isLoading !== state) {
      if (state === false) this.model.makeHide();
      if (state === true) this.model.makeShow();
      this.updateObserver(this.model);
    }
  }

  updateContent() {
    this.model.updateContent();
    this.updateObserver(this.model);
  }

  updateObserver(data) {
    if (this.observers.length > 0) {
      this.observers.forEach((observer) => observer.ObsLoading(data));
    }
  }
}
export default new LoadingService();
