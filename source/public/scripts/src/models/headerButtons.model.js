class HeaderButtons {
  constructor() {
    this.createText = "create new task";
    this.HeaderButtons = new Handlebars.SafeString(
      `
      <button class='filter btn-small btn' id='name_filter'>Name </button>
      <button class='filter btn-small btn' id='date_filter' >DueDate </ button>
      <button class='filter btn-small btn' id='creationDate_filter'>Creation </button>
      <button class='filter btn-small btn' id='importance_filter'>Importance </button>
      `
    );
    this.showHideCompletes_button = new Handlebars.SafeString(
      ` <button class='filter btn hide' id='completed_filter'></button>`
    );
    this.toggleCompleteFilterText = {
      1: "&#128584;",
      0: "&#128053;",
    };
    this.buttonStatus = {
      completed_filter: 0,
    };

    this.activeDirection = 0;
    this.activeFilter = "date_filter";
  }

  sort(mode) {
    this.activeFilter = mode;
    this.activeDirection = this.activeDirection === 0 ? 1 : 0;
  }

  toggle(mode) {
    this.buttonStatus[mode] = this.buttonStatus[mode] === 0 ? 1 : 0;
  }

  checkCompletes(hasCompletes) {
    if (this.completes !== hasCompletes) {
      this.completes = hasCompletes;
    }
  }

  checkCompletesDynamic(hasCompletes) {
    if (this.completes !== hasCompletes) {
      this.completes = hasCompletes;
    }
  }

  reset() {
    this.reRender = false;
  }
}

export default new HeaderButtons();
