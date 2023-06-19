export default class HeaderButtonsView {
  constructor(container, template) {
    this.container = container;
    this.template = template;
    this.init = null;
  }

  hide() {
    this.app.events.pageChanged(this, false);
  }

  get AllFilterButtons() {
    this.filterButtons = document.getElementsByClassName("filter");
    return this.filterButtons;
  }

  render(data) {
    this.container.innerHTML = "";
    this.container.innerHTML = this.template({
      filterButtons: data.HeaderButtons,
      hasCompleteTasks: data.completes,
      completeButtonText:
        data.toggleCompleteFilterText[data.buttonStatus["completed-filter"]],
    });
    this.updateFilter(data);
  }

  toggleFilters() {
    this.filterDiv = document.querySelector(".filter-buttons-div");
    this.filterDiv.classList.toggle("show");
    this.filterDiv = document.querySelector("#toggle-filter-div");
    this.filterDiv.classList.toggle("show");
  }

  updateFilter(data) {
    if (data.completes) {
      this.completeButton = document.getElementById("completed-filter");
      this.completeButton.innerHTML =
        data.toggleCompleteFilterText[data.buttonStatus["completed-filter"]];

      // eslint-disable-next-line no-unused-expressions
      data.buttonStatus["completed-filter"] === 1
        ? this.completeButton.classList.remove("hide")
        : this.completeButton.classList.add("hide");
    }

    Array.from(this.AllFilterButtons).forEach((elem) => {
      elem.classList.remove("active-filter-0", "active-filter-1");
    });
    const activeButton = document.getElementById(data.activeFilter);
    activeButton.classList.add(`active-filter-${data.activeDirection}`);
  }
}
