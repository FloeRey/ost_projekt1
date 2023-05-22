import { generateRandomUUID } from "../utils/utils.js";

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

  createTask(form, editId, generateDate) {
    const formData = new FormData(form);
    const id = editId || this.uuidv4;

    formData.append("task-id", id);
    const title = formData.get("title");
    const description = formData.get("description");
    const importance = formData.get("importance");
    const dueDate = formData.get("dueDate");
    const complete = formData.get("complete");

    const newTask = {
      id,
      title,
      description,
      importance,
      complete: complete ? 1 : 0,
      generateDate,
    };
    console.log(newTask);
    if (dueDate) newTask.dueDate = dueDate;
    return newTask;
  }

  get uuidv4() {
    this.uuid = crypto.randomUUID() || generateRandomUUID();
    return this.uuid;
  }
}

export default new FormModel();
