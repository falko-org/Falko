describe('Authorization tests', () => {
  beforeEach(() => {
    cy.visit('localhost:8080/#/');

    cy.server();

    // Stubing server response
    cy.route({
      method: 'POST',
      url: '/authenticate',
      status: 200,
      response: 'fixture:login.json',
    }).as('login');
  });

  it('should access homepage', () => {
    cy.title().should('include', 'Falko');

    cy.get('#loginRegisterComponent').within(() => {
      cy.get('#loginForm').within(() => {
        cy.get('.falko-button').eq(0).contains('Log In');
      });
    });

    cy.get('h1').eq(0).contains('Start now!');
    cy.get('h1').eq(1).contains('Free Software');
    cy.get('h1').eq(2).contains('See beyond');
  });

  it('should log in user', () => {
    cy.get('form').within(() => {
      cy.get('input:first').eq(0).should('have.attr', 'placeholder', 'Email')
        .type('carla@gmail.com')
        .should('have.value', 'carla@gmail.com');

      cy.get('input:last').eq(0).should('have.attr', 'placeholder', 'Password')
        .type('123456789')
        .should('have.value', '123456789');
    });
    cy.get('.falko-button').eq(0).click();

    cy.url().should('eq', 'http://localhost:8080/#/projects');
  });

  it('should not log in invalid user', () => {
    cy.route({
      method: 'POST',
      url: '/authenticate',
      status: 401,
      response: {
        error: {
          user_authentication: [
            'invalid credentials',
          ],
        },
      },
    }).as('invalidLogin');

    cy.get('form').within(() => {
      cy.get('input:first').eq(0).should('have.attr', 'placeholder', 'Email')
        .type('invalid@gmail')
        .should('have.value', 'invalid@gmail');

      cy.get('.text-danger').contains('The email field must be a valid email.');

      cy.get('input:first').eq(0).should('have.attr', 'placeholder', 'Email')
        .type('.com')
        .should('have.value', 'invalid@gmail.com');

      cy.get('input:last').eq(0).should('have.attr', 'placeholder', 'Password')
        .type('12345')
        .should('have.value', '12345');

      cy.get('.text-danger').contains('The password field must be at least 6 characters.');

      cy.get('input:last').eq(0).should('have.attr', 'placeholder', 'Password')
        .type('6')
        .should('have.value', '123456');
    });

    cy.get('.falko-button').eq(0).click();

    cy.get('.text-danger').contains('Wrong Credentials');

    cy.url().should('eq', 'http://localhost:8080/#/');
  });

  it('should register user', () => {
    // Stubing server response
    cy.route({
      method: 'POST',
      url: '/users',
      status: 200,
      response: 'fixture:login.json',
    }).as('register');

    cy.get('#pills-register-tab').click();

    cy.get('form').within(() => {
      cy.get('input').eq(2).should('have.attr', 'placeholder', 'Username')
        .type('Carla')
        .should('have.value', 'Carla');

      cy.get('input').eq(3).should('have.attr', 'placeholder', 'Enter email')
        .type('carla@gmail.com')
        .should('have.value', 'carla@gmail.com');

      cy.get('input').eq(4).should('have.attr', 'placeholder', 'Password')
        .type('123456789')
        .should('have.value', '123456789');

      cy.get('input').eq(5).should('have.attr', 'placeholder', 'Confirm Password')
        .type('123456789')
        .should('have.value', '123456789');
    });

    cy.get('.falko-button').eq(1).click();

    cy.url().should('eq', 'http://localhost:8080/#/projects');
  });

  it('should not register invalid user', () => {
    // Stubing server response
    cy.route({
      method: 'POST',
      url: '/users',
      status: 401,
      response: {},
    }).as('invalidRegister');

    cy.get('#pills-register-tab').click();

    cy.get('form').within(() => {
      cy.get('input').eq(2).should('have.attr', 'placeholder', 'Username')
        .type('Carla')
        .should('have.value', 'Carla');

      cy.get('input').eq(3).should('have.attr', 'placeholder', 'Enter email')
        .type('carla@gmail')
        .should('have.value', 'carla@gmail');

      cy.get('input').eq(4).should('have.attr', 'placeholder', 'Password')
        .type('12345')
        .should('have.value', '12345');

      cy.get('input').eq(5).should('have.attr', 'placeholder', 'Confirm Password')
        .type('1234')
        .should('have.value', '1234');
    });

    cy.get('.falko-button').eq(1).should('have.attr', 'disabled', 'disabled');

    cy.url().should('eq', 'http://localhost:8080/#/');
  });

  it('should logout user', () => {
    cy.get('form').within(() => {
      cy.get('input:first').eq(0).should('have.attr', 'placeholder', 'Email')
        .type('carla@gmail.com')
        .should('have.value', 'carla@gmail.com');

      cy.get('input:last').eq(0).should('have.attr', 'placeholder', 'Password')
        .type('123456789')
        .should('have.value', '123456789');
    });

    cy.get('.falko-button').eq(0).click();

    cy.get('#noProjects');

    cy.get('.navbar').within(() => {
      cy.get('#logout').click();
    });

    cy.url().should('eq', 'http://localhost:8080/#/')
  })

  it('should not access any page with user logged out', function(){
    cy.visit('localhost:8080/#/asdfasdf')

    cy.get('#loginComponent')
  })
})
