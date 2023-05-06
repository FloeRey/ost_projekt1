import TaskService from "./services/task.service.js";
import LoadingService from "./services/loading.service.js";
import TasksComponent from "./components/tasks.component.js";
import LoadingComponent from "./components/loading.component.js";

class App {
  constructor() {
    this.initService();
    this.tasksComponent = new TasksComponent(this);
    this.loadingComponent = new LoadingComponent(this);

    this.loadingComponent.initialize();
    this.tasksComponent.initialize();
  }

  initService() {
    this.taskService = new TaskService();
    this.loadingService = new LoadingService();
  }
}

document.addEventListener("DOMContentLoaded", () => new App());

/* DEBUG */
const createDB = document.getElementById("sendNew");
console.log(createDB);
createDB.addEventListener("click", createEntry);

async function createEntry() {
  const task = {
    id: "figglegägglefigglegägglefigglegäggle",
    title: "figglegägglefigglegägglefigglegäggle",
  };
  await fetch("http://localhost:3000/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(task),
  });
  // console.log(mysql);
}
