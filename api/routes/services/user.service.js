import { v4 as uuidv4 } from "uuid";
import poolPromise from "../../sql_db.js";
import { hashPassword, comparePassword } from "../commmon/security.js";

class UserService {
  async updateFilter(auth, filterData) {
    const response = (
      await poolPromise.execute(
        "SELECT settings from USERS WHERE uuid=? LIMIT 1",
        auth
      )
    )[0];
    let { settings } = response;
    if (!settings) {
      settings = {};
    } else {
      settings = JSON.parse(settings);
    }
    if (!settings.filter) {
      settings.filter = {};
    }
    Object.assign(settings.filter, filterData);
    await poolPromise.execute(
      `UPDATE USERS SET settings='${JSON.stringify(settings)}' WHERE ?`,
      {
        uuid: auth,
      }
    );
  }

  async getUser(loginData) {
    const userFromDB = (
      await poolPromise.execute(
        "SELECT * from USERS WHERE name= ? LIMIT 1",
        loginData.name
      )
    )[0];
    if (!userFromDB) {
      return "";
    }
    const match = await comparePassword(loginData.pw, userFromDB.pw);
    if (match) {
      return { id: userFromDB.uuid, settings: userFromDB.settings };
    }
    return "";
  }

  async createUser(userData) {
    if (userData.key !== process.env.key) {
      throw new Error(
        "[msg] no user registered - to create a new user add the right key in the key field"
      );
    }
    const entry = await poolPromise.execute(
      "SELECT * from USERS WHERE ? LIMIT 1",
      [{ name: userData.name }]
    );
    if (entry.length !== 0) {
      throw new Error("[msg]  name already registered");
    }
    const hash = await hashPassword(userData.pw);
    await poolPromise.execute("INSERT USERS SET ?", {
      name: userData.name,
      pw: hash,
      uuid: `${uuidv4()}`,
    });
  }

  async getUserSettings(userID) {
    const userSettings = await poolPromise.execute(
      "SELECT * from SETTINGS WHERE ? LIMIT 1",
      {
        user: userID,
      }
    );
    return userSettings;
  }
}

export default new UserService();
