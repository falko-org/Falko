// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
  const user = {
    email: 'carla@email.com',
    password: '123456789',
  }

  cy.visit('localhost:8080/#/');

  cy.server();

  cy.route({
    method: 'POST',
    url: '/authenticate',
    status: 200,
    response: 'fixture:login.json',
  }).as('login');

  cy.get('form').within(() => {
    cy.get('input:first').eq(0).should('have.attr', 'placeholder', 'Email')
      .type(user.email)
      .should('have.value', 'carla@email.com');

    cy.get('input:last').eq(0).should('have.attr', 'placeholder', 'Password')
      .type(user.password)
      .should('have.value', '123456789');
  });

  cy.get('#loginButton').click();

  cy.wait('@login')
})