export default class LoadingService {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  stateChange(state) {
    if (this.isLoading !== state) {
      this.onlyContent = false;
      this.isLoading = state;
      this.updateObserver(this);
    }
  }

  updateObserver(data) {
    if (this.observers.length > 0) {
      this.observers.forEach((observer) => observer.renderLoadingView(data));
    }
  }
}
