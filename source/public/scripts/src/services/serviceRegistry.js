class ServiceRegistry {
  constructor() {
    this.services = new Map();
  }

  addService(selector, service) {
    this.services.set(selector, service);
  }

  getService(selector) {
    return this.services.get(selector);
  }
}

export default new ServiceRegistry();
