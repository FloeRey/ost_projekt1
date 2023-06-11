class Helpers {
  constructor() {
    Handlebars.registerHelper("times", (n, block) => {
      let accum = "";
      for (let i = 0; i < n; ++i) accum += block.fn(i);
      return accum;
    });
    Handlebars.registerHelper("add", (a, b) => a + b);
    Handlebars.registerHelper("eq", (a, b) => a === b);
    Handlebars.registerHelper("noteq", (a, b) => a !== b);
    Handlebars.registerHelper("or", (a, b) => a !== b);
    Handlebars.registerHelper("bigger", (a, b) => a > b);

    Handlebars.registerHelper("selected", (option, value) => {
      if (option + 1 === value) {
        return "selected";
      }
      return "";
    });
    Handlebars.registerPartial("myPartial", "{{prefix}}");
  }
}
export default new Helpers();
