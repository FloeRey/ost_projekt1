import UserService from "./userService.js";
export default class BaseService {
  constructor() {
    console.log("construct base service");
    this.UserService = UserService;
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers.findIndex((obs) => console.log(obs));
    const removeIndex = this.observers.findIndex((obs) => observer === obs);
    if (removeIndex !== -1) {
      this.observers = this.observers.slice(removeIndex, 1);
    }
  }

  async httpRequest(method, path, data) {
    const headers = new Headers({
      "content-type": "application/json",
      Authorization: this.UserService.myId,
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
}
