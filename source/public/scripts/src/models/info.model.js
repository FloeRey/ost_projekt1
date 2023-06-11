export default class InfoModel {
  constructor(userData) {
    this.userData = userData;
    this.text = "status: ";
  }

  updateData(userData) {
    this.userData = userData;
  }
}
