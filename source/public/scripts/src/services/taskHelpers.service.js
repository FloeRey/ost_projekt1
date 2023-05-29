const taskHelper = {
  ls_markComplete(taskId) {
    const index = this.tasks.findIndex((task) => task.id === taskId);
    this.tasks[index].complete = !this.tasks[index].complete;
    localStorage.setItem("myTasks", JSON.stringify(this.tasks));
  },
  sort(filterType, direction) {
    switch (filterType) {
      case "name_filter":
        this.tasks.sort((a, b) =>
          direction === 1
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        );
        break;
      case "date_filter":
        this.tasks.sort((a, b) => {
          if (direction === 0) {
            if (!a.dueDate) {
              return -1;
            }
            return new Date(a.dueDate) - new Date(b.dueDate);
          }
          if (!b.dueDate) {
            return 1;
          }
          return new Date(b.dueDate) - new Date(a.dueDate);

          // if (!a.dueDate) {
          //   return -1;
          // }

          // // if (!a.dueDate || !b.dueDate) return 1;
          // return direction === 0
          //   ? new Date(a.dueDate) - new Date(b.dueDate)
          //   : new Date(b.dueDate) - new Date(a.dueDate);
        });
        break;
      case "creationDate_filter":
        this.tasks.sort((a, b) =>
          direction === 1
            ? b.generateDate - a.generateDate
            : a.generateDate - b.generateDate
        );
        break;
      case "importance_filter":
        this.tasks.sort((a, b) =>
          direction === 1
            ? b.importance - a.importance
            : a.importance - b.importance
        );
        break;
      case "completed_filter":
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
