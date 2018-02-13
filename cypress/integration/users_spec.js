describe('Users tests', () => {
  beforeEach(() => {
    cy.server();

    cy.route({
      method: 'GET',
      url: '/users\/1/projects',
      status: 200,
      response: 'fixture:projects.json',
    }).as('getProjects');

    cy.login();

    cy.route({
      method: 'GET',
      url: '/users/1',
      status: 200,
      response: 'fixture:user.json',
    }).as('getUser');

    cy.get('.fa-user-circle-o').click();
    cy.wait('@getUser');
  });

  it('should access user profile', function(){
    cy.get('h4').contains('User Profile')
    cy.get('.text-muted').eq(0).contains('Carla')
    cy.get('.text-muted').eq(1).contains('carla@gmail.com')
  })

  it('should edit user', () => {
    cy.route({
      method: 'PUT',
      url: '/users/1',
      status: 200,
      response: {
        id: 1,
        name: 'Carla Rocha',
        email: 'carla@gmail.com',
        access_token: null,
      },
    });

    cy.route({
      method: 'GET',
      url: '/users/1',
      status: 200,
      response: {
        id: 1,
        name: 'Carla Rocha',
        email: 'carla@gmail.com',
        access_token: null,
      },
    }).as('getEditUser');

    cy.get('#editbutton').click();
    cy.get('.modal-body').within(() => {
      cy.get('input:first').type(' Rocha').should('have.value', 'Carla Rocha');
    });
    cy.get('.modal-footer').within(() => {
      cy.get('.falko-button').eq(0).click();
    });

    cy.get('.text-muted').eq(0).contains('Carla Rocha');
  });

  it('should delete user', () => {
    cy.route({
      method: 'DELETE',
      url: '/users/1',
      status: 200,
      response: {},
    });

    cy.get('#deletebutton').click();
    cy.wait(200);
    cy.get('.modal-footer').eq(1).within(() => {
      cy.get('.falko-button').click();
    });
    cy.url().should('eq', 'http://localhost:8080/#/');
  });

  // ##################### IMPORTANT #####################
  // Cypress does not allow redirecting outside of the app
  // This is only allowed disabling security options
  // Due to this, it's "impossible" test github linking
  //
  // If you find a workaround, uncomment the test bellow
  // and finish it.
  // #####################################################

  // it('should link account with github', function(){
  //   cy.route({
  //     method: 'POST',
  //     url: '/request_github_token',
  //     status: 200,
  //     response: {
  //       "id": 1,
  //       "name": "Carla",
  //       "email": "carla@gmail.com",
  //       "access_token": "token123456789"
  //     }
  //   })
  //   cy.get('.falko-button').eq(3).click()
  // })
});
