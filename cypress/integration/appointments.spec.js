describe("Appointment", () => {
  beforeEach(function () {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("[data-testid=day]", "Monday");
  });

  it("should book an interview", () => {
    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones")

    cy.get("[alt='Sylvia Palmer']")
      .click();

    cy.contains('Save')
      .click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });

  it("should edit an interview", () => {
    cy.get("[alt='Edit']")
    .click({ force: true });

    cy.get("[alt='Tori Malcolm']")
    .click();

    cy.get("[data-testid=student-name-input]")
    .clear() 
    .type("Camila Rivera");

    cy.contains('Save')
    .click();

    cy.contains(".appointment__card--show", "Camila Rivera");
    cy.contains(".appointment__card--show", "Tori Malcolm");

  });

  it("should cancel an interview", () => {
    cy.get("[alt='Delete']")
    .click({ force: true });

    cy.contains("button", "Confirm")
    .click();

    cy.contains('Deleting');

    cy.contains('Deleting').should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");

  });

});