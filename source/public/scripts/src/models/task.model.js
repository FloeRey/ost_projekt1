export default class TaskModel {
  constructor(id, title, importance, description) {
    this.id = id;
    this.title = title;
    this.importance = importance;
    this.description = description;
  }

  static fromJSON(json) {
    return new this(json.id, json.title, json.importance, json.description);
  }
}
