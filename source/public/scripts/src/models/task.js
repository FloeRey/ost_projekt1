export default class TaskModel {
  constructor(id, title, importance) {
    this.id = id;
    this.title = title;
    this.importance = importance;
  }

  static fromJSON(json) {
    return new this(json.id, json.title, json.importance);
  }
}
