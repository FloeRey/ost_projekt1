import UserService from "../services/user.service.js";
import settings from "../../env.js/settings.js";

import { send, sendError } from "../commmon/createSendResponse.js";

import Validator from "../commmon/validate.js";

class UserController {
  /** // TS ?? //
   * @param {string} validation
   */

  constructor() {
    this.validation = "string";
  }

  async updateFilter(req, res) {
    try {
      const auth = req.header("Authorization");
      if (!auth) throw new Error("you are wrong here");
      const fitlerData = {
        buttonStatus: req.body.buttonStatus,
        activeFilter: req.body.activeFilter,
        activeDirection: req.body.activeDirection,
      };

      await UserService.updateFilter(auth, fitlerData);
      res.send(send("updated"));
    } catch (e) {
      console.log(e);
      res.status(404).send(sendError(e));
    }
  }

  async loginUser(req, res) {
    try {
      const loginData = {
        name: req.body.name,
        pw: req.body.password,
        key: req.body.key,
      };
      let userData = await UserService.getUser(loginData);
      if (!userData) {
        await UserService.createUser(loginData);
        userData = await UserService.getUser(loginData);
      }
      res.send(send(userData));
    } catch (e) {
      res.status(404).send(sendError(e));
    }
  }
}

export default new UserController();
