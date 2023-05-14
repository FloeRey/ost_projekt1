export default class HeaderButtonsView {
  constructor(container, template) {
    this.container = container;
    this.template = template;
  }

  hide() {
    this.container.innerHTML = "";
  }

  get AllFilterButtons() {
    this.filterButtons = document.getElementsByClassName("filter");
    return this.filterButtons;
  }

  render(data) {
    this.container.innerHTML = "";
    this.container.innerHTML = this.template({
      filterButtons: data.HeaderButtons,
      sortMethod: data.activeSort,
      showHideComplete: data.completes ? data.showHideCompletes_button : "",
    });
  }

  updateFilter(data) {
    if (data.activeFilter === "completed_filter") {
      document.getElementById("completed_filter").innerHTML =
        data.toggleCompleteFilterText[data.activeDirection];
    } else {
      Array.from(this.AllFilterButtons).forEach((elem) => {
        elem.classList.remove("activeFilter_0", "activeFilter_1");
      });
      const activeButton = document.getElementById(data.activeFilter);
      activeButton.classList.add(`activeFilter_${data.activeDirection}`);
    }
  }
}
