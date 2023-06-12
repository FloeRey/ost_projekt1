import { URLS, settings } from "../../../new_env.js";
import { createJSONfromFormData } from "../utils/utils.js";

import _UserData_ from "./utils/userData.js";

class UserService {
  #id;

  constructor() {
    this.userData = new _UserData_();
  }

  /** // TS ?? //
   * @param {number} id
   */

  setGuestMode() {
    this.#id = settings.guestId;
  }

  async getGuestMode() {
    const response = await this.httpRequest("GET", URLS.users.getGuestId);
    this.#id = response.msg;
  }

  async checkLogin() {
    const form = document.getElementById("login-form");
    const formData = new FormData(form);
    const { msg } = await this.httpRequest(
      "POST",
      URLS.users.login,
      createJSONfromFormData(formData)
    );

    this.#id = msg.id;
    if (msg.settings) {
      this.userData.addSettings(JSON.parse(msg.settings));
    }
    return this.#id;
  }

  async httpRequest(method, path, data) {
    const headers = new Headers({
      "content-type": "application/json",
    });

    const response = await fetch(path, {
      method,
      headers,
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return response.json();
    }
    throw await response.json();
  }

  get myId() {
    return this.#id;
  }

  async getSettings() {
    if (this.workMode === "offline") {
      return this.readFromLocal;
    }
    return this.userData;
  }

  get readFromLocal() {
    const userOptions = localStorage.getItem("settings");
    if (!userOptions) return this.userData;
    return this.userData.addSettings(userOptions);
  }

  get getData() {
    return this.userData;
  }

  changeTheme() {
    this.userData.theme = this.userData.theme === "dark" ? "light" : "dark";
    return this.userData.theme;
  }
}

export default new UserService();
