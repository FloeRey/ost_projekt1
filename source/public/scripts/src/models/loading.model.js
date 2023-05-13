class LoadingModel {
  constructor() {
    this.text = "loading";
    this.intervalTime = 100;
    this.addText = "";
    this.beforeText = "";
    this.setVisible = false;
  }

  updateContent() {
    this.onlyContent = true;
    if (this.addText.length < this.text.length) {
      this.addText += ".";
    } else if (this.beforeText.length < this.text.length) {
      this.beforeText += ".";
    } else {
      this.beforeText = "";
      this.addText = "";
    }
  }

  hideElement() {
    this.isFullyHidden = true;
  }

  makeShow() {
    console.log("make show");
    this.onlyContent = false;
    this.isLoading = true;
  }

  makeHide() {
    this.isLoading = false;
  }
}

export default new LoadingModel();
