const taskHelper = {
  ls_markComplete(taskId) {
    const index = this.tasks.findIndex((task) => task.id === taskId);
    this.tasks[index].complete = !this.tasks[index].complete;
    localStorage.setItem("myTasks", JSON.stringify(this.tasks));
  },
  sort(filterType, direction) {
    switch (filterType) {
      case "noDate-filter":
        this.tasks.sort((a, b) => {
          if (!a.dueDate && !b.dueDate) return 1;
          if (direction === 1) {
            if (!b.dueDate) return -1;
            if (!a.dueDate) return 1;
          }
          if (!b.dueDate) return 1;
          if (!a.dueDate) return -1;
          return 0;
        });
        break;
      case "name-filter":
        this.tasks.sort((a, b) =>
          direction === 1
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        );
        break;
      case "date-filter":
        this.tasks.sort((a, b) => {
          if (!a.dueDate) {
            return -1;
          }
          if (!b.dueDate) {
            return 1;
          }
          if (direction === 1) {
            return new Date(a.dueDate) - new Date(b.dueDate);
          }
          return new Date(b.dueDate) - new Date(a.dueDate);
        });
        break;
      case "creationDate-filter":
        this.tasks.sort((a, b) =>
          direction === 0
            ? b.generateDate - a.generateDate
            : a.generateDate - b.generateDate
        );
        break;
      case "importance-filter":
        this.tasks.sort((a, b) =>
          direction === 0
            ? b.importance - a.importance
            : a.importance - b.importance
        );
        break;
      case "completed-filter":
        this.tasks.forEach((task) => {
          if (task.complete) {
            if (direction === 1) {
              // eslint-disable-next-line no-param-reassign
              task.hideTask = true;
            } else {
              // eslint-disable-next-line no-param-reassign
              task.hideTask = false;
            }
          }
        });
        break;
      default:
        break;
    }
    this.update();
  },
};

export default taskHelper;
