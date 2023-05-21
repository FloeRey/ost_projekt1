export default class InfoModel {
  constructor(userData) {
    this.userData = userData;
    this.text = "";
  }

  updateData(userData) {
    this.userData = userData;
  }
}
