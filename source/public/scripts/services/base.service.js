export default class BaseService {
  constructor() {
    this.headers = new Headers({
      "content-type": "application/json",
    });
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    const removeIndex = this.observers.findIndex((obs) => observer === obs);
    if (removeIndex !== -1) {
      this.observers = this.observers.slice(removeIndex, 1);
    }
  }

  async httpRequest(method, path, data) {
    const response = await fetch(path, {
      method,
      headers: this.headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    /* const results = await response.json();
    return results;*/
    return response.json();
  }
}
