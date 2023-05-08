class HeaderButtons {
  constructor() {
    this.createText = "create new task";
    this.HeaderButtons = new Handlebars.SafeString(
      "<button id='backButton'>backButton</button><button id=''>button2</button>"
    );
  }
}

export default new HeaderButtons();
