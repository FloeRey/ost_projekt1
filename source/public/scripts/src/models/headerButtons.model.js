class HeaderButtons {
  constructor() {
    this.createText = "create new task";
    this.HeaderButtons = new Handlebars.SafeString(
      `
      <button class='filter sort_btn btn' id='name_filter'>Name </button>
      <button class='filter sort_btn btn' id='date_filter' >DueDate </ >
      <button class='filter sort_btn btn' id='creationDate_filter'>Creation </button>
      <button class='filter sort_btn btn' id='importance_filter'>Importance </button>
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
