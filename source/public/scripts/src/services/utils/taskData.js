export default class _TaskData_ {
  constructor(
    id,
    title,
    importance,
    description,
    dueDate,
    complete,
    generateDate = new Date().getTime()
  ) {
    this.id = id;
    this.title = title;
    this.importance = importance;
    this.description = description || "no description";
    this.generateDate = generateDate;
    this.dueDate = dueDate || "no dueDate";
    this.complete = complete;
  }

  static fromJSON(json) {
    return new this(
      json.id,
      json.title,
      json.importance,
      json.description,
      json.dueDate,
      json.complete,
      json.generateDate
    );
  }
}
