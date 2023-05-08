export default class BaseService {
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
    this.lint = "whyIhaveToDoThisForLint?";
    const headers = new Headers({
      "content-type": "application/json",
    });
    const response = await fetch(path, {
      method,
      headers,
      body: JSON.stringify(data),
    });
    return response.json();
  }
}
