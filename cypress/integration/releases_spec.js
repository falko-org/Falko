describe('Releases tests', () => {
  beforeEach(() => {
    cy.server()
  
    cy.route({
      method: 'GET',
      url: '/users\/1/projects',
      status: 200,
      response: 'fixture:projects.json'
    }).as('getProjects');

    cy.route({
      method: 'GET',
      url: '/projects\/2',
      status: 200,
      response: 'fixture:project.json'
    }).as('getProject')

        cy.route({
      method: 'GET',
      url: '/projects\/2/releases',
      status: 200,
      response: 'fixture:releases.json'
    }).as('getReleases');

    cy.login();

  })
    
  
  it('should get releases', () => {
    cy.get('#projectCard2').click();
    
    cy.get('#releases').click();
    
    cy.get('div#release2').contains('R2');
    cy.get('h1#release0Name').should('contain', 'R2');
    cy.get('#release0Description').should('contain', 'Second Release');
    cy.get('#releasePeriod');
    cy.get('#addReleaseButton').should('contain', 'Add Release');
    cy.get('#addSprintButton').should('contain', 'Add a Sprint');
  })
})