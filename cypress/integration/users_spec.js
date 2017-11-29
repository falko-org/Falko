describe('Users tests', function(){
  function login() {
    cy.route({
      method: 'POST',
      url: '/authenticate',
      status: 200,
      response: 'fixture:login.json'
    }).as('login')

    cy.get('form').within(function () {
      cy.get('input:first').eq(0).should('have.attr', 'placeholder', 'Email')
        .type('carla@gmail.com').should('have.value', 'carla@gmail.com')

      cy.get('input:last').eq(0).should('have.attr', 'placeholder', 'Password')
        .type('123456789').should('have.value', '123456789')
    })

    cy.get('.falko-button').eq(0).click()
  }

  beforeEach(function () {
    cy.visit('localhost:8080/#/')

    cy.server()

    cy.route({
      method: 'GET',
      url: '/users\/1/projects',
      status: 200,
      response: 'fixture:projects.json'
    }).as('getProjects')

    login()

    cy.route({
      method: 'GET',
      url: '/users/1',
      status: 200,
      response: 'fixture:user.json'
    }).as('getUser')

    cy.get('.fa-user-circle-o').click()
    cy.wait('@getUser')
  })

  it('should access user profile', function(){
    cy.get('h4').contains('User Profile')
    cy.get('.text-muted').eq(0).contains('Carla')
    cy.get('.text-muted').eq(1).contains('carla@gmail.com')
    cy.get('.text-muted').eq(2).contains('carlaGit')
  })

  it('should edit user', function(){
    cy.route({
      method: 'PUT',
      url: '/users/1',
      status: 200,
      response: {
        "id": 1,
        "name": "Carla Rocha",
        "email": "carla@gmail.com",
        "github": "carlaGit",
        "access_token": null
      }
    })

    cy.route({
      method: 'GET',
      url: '/users/1',
      status: 200,
      response: {
        "id": 1,
        "name": "Carla Rocha",
        "email": "carla@gmail.com",
        "github": "carlaGit",
        "access_token": null
      }
    }).as('getEditUser')

    cy.get('#editbutton').click()
    cy.get('.modal-body').within(function(){
      cy.get('input:first').type(' Rocha').should('have.value', 'Carla Rocha')
    })
    cy.get('.modal-footer').within(function(){
      cy.get('.falko-button').eq(0).click()  
    })

    cy.get('.text-muted').eq(0).contains('Carla Rocha')
  })

  it('should delete user', function(){
    cy.route({
      method: 'DELETE',
      url: '/users/1',
      status: 200,
      response: {}
    })

    cy.get('#deletebutton').click()
    cy.wait(200)
    cy.get('.modal-footer').eq(1).within(function(){
      cy.get('.falko-button').click()
    })
    cy.url().should('eq', 'http://localhost:8080/#/')
  })

  // it('should link account with github', function(){
  //   cy.route({
  //     method: 'POST',
  //     url: '/request_github_token',
  //     status: 200,
  //     response: {
  //       "id": 1,
  //       "name": "Carla",
  //       "email": "carla@gmail.com",
  //       "github": "carlaGit",
  //       "access_token": "token123456789"
  //     }
  //   })
  //   cy.get('.falko-button').eq(3).click()
  // })
})