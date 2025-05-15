describe("Books list loginin test", () => {
  beforeEach(() => {
    cy.viewport(Cypress.env("viewportWidth"), Cypress.env("viewportHeight"));
    cy.visit("/");
  });
  it("Viewing page", () => {
    cy.contains("Books list").should("be.visible");
  });

  it("Login in account", () => {
    cy.login("test@test.com", "test");
    cy.checkPage("Log out", "Добро пожаловать test@test.com");
  });

  it("Login in account with empty login", () => {
    cy.login(" ", "test");
    cy.checkValidity("#mail", "be.false");
  });

  it("Login in account with empty password", () => {
    cy.login("test@test.com", "{backspace}");
    cy.checkValidity("#pass", "be.false");
  });
});

describe("Books favoirate list tests", () => {
  let refBook = "";
  const bookName = "The Wonderful Wizard of Oz";
  const description = "description_test";
  const fileCoverWay = "adding materials/The_Wonderful_Wizard_of_Oz.png";
  const fileBookWay = "adding materials/Baum_The_Wonderful_Wizard_of_Oz.doc";
  const authors = "L.Frank Baum, W.W. Denslow";

  beforeEach(() => {
    cy.viewport(Cypress.env("viewportWidth"), Cypress.env("viewportHeight"));
    cy.visit("/");
    cy.login("test@test.com", "test");
    cy.checkPage("Log out", "Добро пожаловать test@test.com");
  });

  it("Add 1 book to collection", () => {
    cy.addBook(bookName, description, fileCoverWay, fileBookWay, authors);
    cy.contains(bookName, { timeout: 20000 })
      .invoke("attr", "href")
      .then((val) => {
        refBook = val;
      });
  });

  it("Add 1 book to favorite", () => {
    cy.get(`[href="${refBook}"] .btn.btn-success`, { timeout: 20000 }).click();
    cy.get(`[href="${refBook}"] .btn`, {
      timeout: 60000,
    })
      .should("be.visible")
      .and("contain", "Delete from favorite");
  });

  it("Delete 1 book from favorite", () => {
    cy.get(`[href="${refBook}"] .btn.btn-secondary`, {
      timeout: 20000,
    }).click();
    cy.get(`[href="${refBook}"] .btn`, { timeout: 60000 })
      .should("be.visible")
      .and("contain", "Add to favorite");
  });
});
