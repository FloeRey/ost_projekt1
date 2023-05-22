import { URLS } from "../../../new_env.js";

import { createJSONfromFormData } from "../utils/utils.js";

class UserService {
  #id;

  /**
   * @param {any} id
   */

  set id(id) {
    this.#id = id;
  }

  async checkLogin() {
    const form = document.getElementById("loginForm");
    const formData = new FormData(form);

    const { msg } = await this.httpRequest(
      "POST",
      URLS.users.checkUserIsLogged,
      createJSONfromFormData(formData)
    );
    console.log(msg.uuid);

    this.#id = msg.uuid;
    return this.#id;
  }

  async createNew() {
    const form = document.getElementById("loginForm");
    const formData = new FormData(form);

    const results = await this.httpRequest(
      "POST",
      URLS.users.createNewUser,
      createJSONfromFormData(formData)
    );
    return results;
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

    return response.json().then((error) => {
      throw error;
    });
  }

  get myId() {
    return this.#id;
  }
}

export default new UserService();
