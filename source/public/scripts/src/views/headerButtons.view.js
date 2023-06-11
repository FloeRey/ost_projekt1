export default class HeaderButtonsView {
  constructor(container, template) {
    this.container = container;
    this.template = template;
    this.init = null;
  }

  hide() {
    this.app.events.pageChanged(this, false);
    // this.container.innerHTML = "";
    // this.container.classList.add("__isHidden");
  }

  get AllFilterButtons() {
    this.filterButtons = document.getElementsByClassName("filter");
    return this.filterButtons;
  }

  render(data) {
    // this.container.classList.remove("__isHidden");
    this.container.innerHTML = "";
    this.container.innerHTML = this.template({
      filterButtons: data.HeaderButtons,
      hasCompleteTasks: data.completes,
      completeButtonText:
        data.toggleCompleteFilterText[data.buttonStatus.completed_filter],
    });
    this.updateFilter(data);
  }

  toggleFilters() {
    this.filterDiv = document.querySelector(".filterButtonsDiv");
    this.filterDiv.classList.toggle("show");
    this.filterDiv = document.querySelector("#toggleFilterDiv");
    this.filterDiv.classList.toggle("show");
  }

  updateFilter(data) {
    if (data.completes) {
      this.completeButton = document.getElementById("completed_filter");
      this.completeButton.innerHTML =
        data.toggleCompleteFilterText[data.buttonStatus.completed_filter];

      // eslint-disable-next-line no-unused-expressions
      data.buttonStatus.completed_filter === 1
        ? this.completeButton.classList.remove("hide")
        : this.completeButton.classList.add("hide");
    }

    Array.from(this.AllFilterButtons).forEach((elem) => {
      elem.classList.remove("activeFilter_0", "activeFilter_1");
    });
    const activeButton = document.getElementById(data.activeFilter);
    activeButton.classList.add(`activeFilter_${data.activeDirection}`);

    // if (data.activeFilter === "completed_filter") {
    //   if (data.completes) {
    //     this.completeButton = document.getElementById(data.activeFilter);
    //     this.completeButton.innerHTML =
    //       data.toggleCompleteFilterText[data.buttonStatus[data.activeFilter]];
    //     if (data.buttonStatus[data.activeFilter] === 1) {
    //       this.completeButton.classList.remove("hide");
    //       this.completeButton.classList.add("show");
    //     } else {
    //       this.completeButton.classList.remove("show");
    //       this.completeButton.classList.add("hide");
    //     }
    //   }
    // } else {
    //   Array.from(this.AllFilterButtons).forEach((elem) => {
    //     elem.classList.remove("activeFilter_0", "activeFilter_1");
    //   });
    //   const activeButton = document.getElementById(data.activeFilter);
    //   activeButton.classList.add(`activeFilter_${data.activeDirection}`);
    // }
  }
}
