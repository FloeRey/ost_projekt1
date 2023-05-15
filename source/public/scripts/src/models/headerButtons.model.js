class HeaderButtons {
  constructor() {
    this.createText = "create new task";
    this.HeaderButtons = new Handlebars.SafeString(
      `
      <button class='filter btn' id='name_filter'>Name</button>
      <button class='filter btn' id='date_filter' > By Due Date</ >
      <button class='filter btn' id='creationDate_filter'>By Creation Date</button>
      <button class='filter btn' id='importance_filter'>By Importance</button>
      `
    );
    this.showHideCompletes_button = new Handlebars.SafeString(
      ` <button class='filter btn hide' id='completed_filter'>Hide Complete Tasks</button>`
    );
    this.toggleCompleteFilterText = {
      0: "Hide Complete Tasks",
      1: "Show complete tasks",
    };
    this.direction = {
      completed_filter: 0, // start value
    };
    this.activeDirection = 0;
  }

  sort(mode) {
    this.activeFilter = mode;
    this.direction[this.activeFilter] =
      this.direction[this.activeFilter] === 0 ? 1 : 0;
    this.activeDirection = this.direction[this.activeFilter];
  }

  checkCompletes(hasCompletes) {
    if (this.completes !== hasCompletes) {
      this.completes = hasCompletes;
    }
  }

  checkCompletesDynamic(hasCompletes) {
    if (this.completes !== hasCompletes) {
      this.completes = hasCompletes;
      this.reRender = true;
      this.activeFilter = "completed_filter";
    }
  }

  reset() {
    this.reRender = false;
  }
}

export default new HeaderButtons();
