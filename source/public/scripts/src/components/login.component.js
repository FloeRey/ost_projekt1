import StatusService from "../services/status.service.js";
import UserService from "../services/userService.js";

class LoginComp {
  constructor() {
    this.login = document.querySelector("#login");
    this.login.innerHTML = `<div>
     <form id='loginForm'> <div><input name='name' type='text' placeholder='name' autocomplete='username'></div><div><input name='password' type='password' placeholder='password' autocomplete='current-password' > </div> <div><input name='key' placeholder='key'></div><div class='buttons'> <button type='button' id='create' class='btn btn_login success' >create</button><button type='button' class='btn btn_login success' id='submit' >login</button></div></form > <fieldset id="fieldSet"></fieldset>
      </div > <div id='info_login'></div>
      <hr>
      <div class="d-flex_j"><button type='button' class='btn btn_login warning ' id='offline'>work offline</button></div>
      `;
    this.createButton = document.querySelector("#create");
    this.fieldSet = document.querySelector("#fieldSet");
    this.submitButton = document.querySelector("#submit");
    this.offline = document.querySelector("#offline");
    this.info = document.querySelector("#info_login");
  }

  init(app) {
    this.login.removeAttribute("hidden");
    this.offline.addEventListener("click", () => {
      StatusService.mode = "offline";
      this.login.innerHTML = "";
      this.login.setAttribute("hidden", "true");
      app.initialize();
    });

    this.submitButton.addEventListener("click", (e) => {
      this.info.innerHTML = "plase wait";
      this.fieldSet.disabled = true;
      e.preventDefault();
      UserService.checkLogin()
        .then(() => {
          this.login.innerHTML = "";
          this.login.setAttribute("hidden", "true");
          app.initialize();
        })
        .catch((error) => {
          this.info.innerHTML = error.error || "something failed";
        })
        .finally(() => {
          this.fieldSet.disabled = false;
        });
    });

    this.createButton.addEventListener("click", (e) => {
      this.info.innerHTML = "plase wait";
      this.fieldSet.disabled = true;
      e.preventDefault();
      UserService.createNew()
        .then(() => {
          this.info.innerHTML = "created - try to log in";
        })
        .catch((error) => {
          this.info.innerHTML = error.error || "something failed";
        })
        .finally(() => {
          this.fieldSet.disabled = false;
        });
    });
  }
}

export default new LoginComp();
