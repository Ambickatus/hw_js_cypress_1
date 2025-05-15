const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // retries: 2,
    baseUrl: "http://localhost:3000/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    viewportWidth: 360,
    viewportHeight: 640,
  },
});
