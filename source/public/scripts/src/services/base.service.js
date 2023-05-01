export default class BaseService {
  async httpRequest(method, path, data) {
    this.lint = "whyIhaveToDoThisForLint?";
    const header = new Headers({
      "content-type": "application/json",
    });
    const response = await fetch(path, {
      method,
      header,
      body: JSON.stringify(data),
    });
    return response.json();
  }
}
