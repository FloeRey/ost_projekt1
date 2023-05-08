class FormModel {
  constructor() {
    this.createText = "create new task";
    this.formData = {
      createText: "create new task",
      description: "description",
      importance: "importance",
      dueData: "dueDate",
    };
  }

  createTask(form) {
    const formData = new FormData(form);
    const id = this.uuidv4;
    formData.append("task-id", id);
    const title = formData.get("title");
    const description = formData.get("description");
    const importance = formData.get("importance");
    const newTask = {
      id,
      title,
      description,
      importance,
    };
    return newTask;
  }

  get uuidv4() {
    return crypto.randomUUID() || Math.random();
  }
}

export default new FormModel();
