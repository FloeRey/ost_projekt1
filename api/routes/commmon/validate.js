import { sendError } from "./createSendResponse.js";

export default class Validator {
  static name(name) {
    if (name === "string") return true;
    return false;
  }

  static typeName(typeOfName) {
    if (typeOfName === "string") return true;
    return false;
  }

  static typePassword(typeOfPassword) {
    console.log("tyype password");
    if (typeOfPassword === "string") return true;
    return false;
  }

  static async login(req, res, next) {
    try {
      if (!req.body.name || !req.body.password) {
        throw new Error("[msg] fill out name and password");
      }
      if (
        !Validator.typeName(typeof req.body.name) ||
        !Validator.typePassword(typeof req.body.password)
      ) {
        throw new Error("asdasd");
      }
      next();
    } catch (e) {
      console.log(e);
      res.status(404).send(sendError(e));
    }

    // throw new Error("asdasdsad");
  }
}
