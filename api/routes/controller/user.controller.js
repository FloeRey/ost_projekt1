import UserService from "../services/user.service.js";
import settings from "../../env.js/settings.js";

import { send, sendError } from "../commmon/createSendResponse.js";

class UserController {
  async loginUser(req, res) {
    try {
      if (!req.body.name || !req.body.password) {
        throw new Error("[msg] fill out name and password");
      }
      if (
        typeof req.body.name !== "string" ||
        typeof req.body.password !== "string"
      ) {
        throw new Error(settings.defaultError);
      }
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
