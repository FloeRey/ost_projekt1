export default class _UserData_ {
  constructor() {
    this.theme = "dark";
    this.settings = {};
    this.filter_settings = {};
  }

  addSettings(userOptions) {
    if (userOptions.theme) this.theme = userOptions.theme;
    if (userOptions.settings) this.settings = userOptions.settings;
    if (userOptions.filter) this.filter_settings = userOptions.filter;
  }
}
