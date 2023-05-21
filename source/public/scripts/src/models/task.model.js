export default class TaskModel {
  constructor() {
    this.removeText = "Are you sure to delete?";
  }

  static getAttributeFromNode(node, attribute) {
    return node.getAttribute(attribute);
  }

  warn() {
    if (window.confirm(this.removeText) === true) {
      return true;
    }
    return false;
  }
}
