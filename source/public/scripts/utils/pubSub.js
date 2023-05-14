class PubSub {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  publish(eventName, data) {
    if (!this.events[eventName]) {
      return;
    }
    this.events[eventName].forEach((callback) => {
      callback(data);
    });
  }
}
export default new PubSub();
