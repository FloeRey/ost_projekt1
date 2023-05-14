class HeaderButtons {
  constructor() {
    this.createText = "create new task";
    this.HeaderButtons = new Handlebars.SafeString(
      `<button class='filter' id='name_filter'>Name</button>
      <button  class= 'filter'  id = 'date_filter' > By Due Date</ >
      <button  class='filter'  id='creationDate_filter'>By Creation Date</button>
      <button  class='filter'  id='importance_filter'>By Importance</button>
      <button  class='filter'  id='completed_filter'>Hide Complete Tasks</button>
      `
    );
    this.toggleCompleteFilterText = {
      0: "Hide Complete Tasks",
      1: "Show complete tasks",
    };
    this.direction = {};
  }

  sort(mode) {
    console.log(this.direction);
    this.activeFilter = mode;
    // this.activeDirection = this.activeDirection === 1 ? 0 : 1;
    this.direction[this.activeFilter] =
      this.direction[this.activeFilter] === 1 ? 0 : 1;
    this.activeDirection = this.direction[this.activeFilter];
  }
}

export default new HeaderButtons();
