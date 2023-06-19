class HeaderButtons {
  constructor() {
    this.createText = "create new task";
    this.HeaderButtons = new Handlebars.SafeString(
      `
      <button class='filter btn-small btn' id='name-filter'>Name </button>
      <button class='filter btn-small btn' id='date-filter' >DueDate </ button>
      <button class='filter btn-small btn' id='noDate-filter' > noDate </ button>
      <button class='filter btn-small btn' id='creationDate-filter'>Creation </button>
      <button class='filter btn-small btn' id='importance-filter'>Importance </button>
      `
    );
    this.showHideCompletes_button = new Handlebars.SafeString(
      ` <button class='filter btn hide' id='completed-filter'></button>`
    );
    this.toggleCompleteFilterText = {
      1: "&#128584;",
      0: "&#128053;",
    };
    this.buttonStatus = {
      "completed-filter": 0,
    };
    this.activeDirection = 0;
    this.activeFilter = "date-filter";
  }

  sort(mode, setActiveDirection) {
    this.activeFilter = mode;
    if (setActiveDirection !== undefined) {
      this.activeDirection = setActiveDirection;
    } else {
      this.activeDirection = this.activeDirection === 0 ? 1 : 0;
    }
  }

  toggle(mode, setButtonStatus) {
    if (setButtonStatus !== undefined) {
      this.buttonStatus[mode] = setButtonStatus;
    } else {
      this.buttonStatus[mode] = this.buttonStatus[mode] === 0 ? 1 : 0;
    }
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
