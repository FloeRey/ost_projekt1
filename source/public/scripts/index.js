import sendToDB from "./db.js";
import env from "../../env.js";

const { baseUrl, MODE } = env;

/* local or db */


let myTasks = [];

const taskTemplate = document.getElementById("task-template").innerHTML;
const createTemplate = document.getElementById("create-template").innerHTML;
const navTemplate = document.getElementById("navigation-template").innerHTML;

const contentDiv = document.getElementById("content");
const compiledHomeTemplate = Handlebars.compile(taskTemplate);
const compiledCreateTemplate = Handlebars.compile(createTemplate);
const compilednavTemplate = Handlebars.compile(navTemplate);

const headerButtons = document.getElementById("headerButtons");

Handlebars.registerHelper("times", (n, block) => {
  let accum = "";
  for (let i = 0; i < n; ++i) accum += block.fn(i);
  return accum;
});

Handlebars.registerHelper("add", function (a, b) {
  return a + b;
});

Handlebars.registerHelper("eq", function (a, b) {
  return a === b;
});

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

const switchView = (view) => {
  if (view !== "main") {
    contentDiv.innerHTML = compiledCreateTemplate();
    headerButtons.innerHTML = compilednavTemplate({ showButtons_main: false });
    document.getElementById("backButton").addEventListener("click", () => {
      switchView("main");
    });
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const id = uuidv4();
      const name = formData.get("name");
      const Description = formData.get("Description");
      const importance = formData.get("importance");
      const newTask = {
        id,
        name,
        Description,
        importance,
      };
      myTasks.unshift(newTask);
      localStorage.setItem("myTasks", JSON.stringify(myTasks));
      if (MODE === "db") {
        sendToDB(newTask)
          .then(() => {
            switchView("main");
          })
          .catch(() =>
            console.warn("troubles to upload db -> but stored in localStorage")
          );
      } else {
        switchView("main");
      }
    });
  } else {
    const data = { myTasks, themeMode: "darkMode" };
    contentDiv.innerHTML = compiledHomeTemplate(data);
    headerButtons.innerHTML = compilednavTemplate({ showButtons_main: true });
    document.getElementById("createButton").addEventListener("click", () => {
      switchView("formular");
    });
  }
};
const loadFromLocal = () => {
  if (localStorage.myTasks) {
    myTasks = JSON.parse(localStorage.myTasks);
  }
  switchView("main");
};

(async () => {
  if (MODE === "db") {
    try {
      const response = await fetch(`${baseUrl}task`);
      if (!response.ok) {
        throw new Error("Error fetching data, used localStorage");
      }
      if (response) {
        myTasks = await response.json();
      }
      switchView("main");
    } catch (error) {
      loadFromLocal();
    }
  } else {
    loadFromLocal();
  }
})();
