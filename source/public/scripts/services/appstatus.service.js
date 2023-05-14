import BaseService from "./base.service.js";
import env from "../../env.js";

import _UserData_ from "./utils/userData.js";

class AppStatusService extends BaseService {
  constructor() {
    super();
    this.observers = [];
    this.status = {};
    this.url = {
      getUserSettings: `${env.baseUrl}/user/getUserData`,
    };
  }

  update(data) {
    if (this.observers.length > 0) {
      this.observers.forEach((observer) => observer.ObsStatus(data));
    }
  }

  get readState() {
    return this.status;
  }

  async initialize() {
    try {
      const userData = await this.httpRequest(
        "POST",
        this.url.getUserSettings,
        {
          userID: env.userID,
        }
      );
      this.status.ready = 1;
      return userData;
    } catch (e) {
      return _UserData_;
    }
    //this.status = await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}

export default new AppStatusService();
