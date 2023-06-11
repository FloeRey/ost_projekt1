import StatusService from "../services/status.service.js";
import UserService from "../services/userService.js";

class LoginComp {
  constructor() {
    this.login = document.querySelector("#login");
    this.login.innerHTML = `
      <div id="login_wrapper">
      <form id='loginForm'>  <div><input name='name' type='text' placeholder='name' autocomplete='username'></div><div><input name='password' type='password' placeholder='password' autocomplete='current-password' > </div> <div><input name='key' placeholder='key'><hr></div><div class='buttons'>
      <button type='button' class='btn btn_login warning ' id='offline'>offline</button>
      <button type='button' class='btn btn_login success' id='submit' >login</button></div> </form >
      <div id='info_login'>  </div ></div>
    `;
    this.submitButton = document.querySelector("#submit");
    this.offline = document.querySelector("#offline");
    this.info = document.querySelector("#info_login");
  }

  init(app) {
    this.form = document.querySelector("#loginForm");
    this.login.removeAttribute("hidden");
    this.offline.addEventListener("click", () => {
      StatusService.mode = "offline";
      this.login.innerHTML = "";
      this.login.style.display = "none";
      app.initialize();
    });

    this.submitButton.addEventListener("click", (e) => {
      this.info.innerHTML = "plase wait";
      this.form.classList.toggle("zoom_out");
      e.preventDefault();
      UserService.checkLogin()
        .then(() => {
          this.login.innerHTML = "";
          this.login.style.display = "none";
          app.initialize();
        })
        .catch((error) => {
          this.info.innerHTML = error.error || "something failed";
          this.form.classList.toggle("zoom_out");
        });
    });
  }
}

export default new LoginComp();
