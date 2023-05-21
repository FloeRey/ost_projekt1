export default class _UserData_ {
  constructor() {
    this.theme = "dark";
    this.settings = {};
  }

  addSettings(userOptions) {
    if (userOptions.theme) this.theme = userOptions.theme;
    if (userOptions.settings) this.settings = userOptions.settings;
  }
}
