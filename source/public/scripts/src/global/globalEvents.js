class Events {
  constructor() {
    this.pageChange = {};
    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const submit = document.querySelector("button.success");
        if (submit) {
          e.preventDefault();
          submit.click();
        }
      }
    });
  }

  pageChanged(component, showHide) {
    const { componentName, container } = component;
    if (!this.pageChange[componentName]) {
      this.pageChange[componentName] = {
        component,
      };
    }
    this.pageChange[componentName].target = showHide;
    if (this.pageChange[componentName].timer) {
      clearTimeout(this.pageChange[componentName].timer);
    }

    if (this.pageChange[componentName].target) {
      container.classList.remove("is-hidden");
      container.classList.add("is-visible");
    } else {
      container.classList.remove("is-visible");
      container.classList.add("is-hidden");
    }
    this.pageChange[componentName].timer = setTimeout(() => {
      if (this.pageChange[componentName].target) {
        container.classList.remove("is-visible");
      } else {
        container.innerHTML = "";
        container.classList.remove("is-hidden");
      }
    }, 200);
  }
}

export default new Events();
