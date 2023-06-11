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
    //todo
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
      container.classList.remove("__isHidden");
      container.classList.add("__isVisible");
    } else {
      container.classList.remove("__isVisible");
      container.classList.add("__isHidden");
    }

    this.pageChange[componentName].timer = setTimeout(() => {
      if (this.pageChange[componentName].target) {
        container.classList.remove("__isVisible");
      } else {
        container.innerHTML = "";
        container.classList.remove("__isHidden");
      }
    }, 200);
  }
}

export default new Events();
