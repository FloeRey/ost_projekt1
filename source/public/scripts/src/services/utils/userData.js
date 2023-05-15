export default class _UserData_ {
  constructor() {
    this.theme = "dark";
    this.settings = {};
  }

  set addSettings(userOptions) {
    this.theme = userOptions.theme;
    this.settings = userOptions.settings;
  }
}
