export default class TaskModel {
  constructor() {
    this.removeText = "Are you sure to delete?";
  }

  static getAttributeFromNode(node, attribute) {
    return node.getAttribute(attribute);
  }

  warn() {
    // eslint-disable-next-line no-alert
    if (window.confirm(this.removeText) === true) {
      return true;
    }
    return false;
  }
}
