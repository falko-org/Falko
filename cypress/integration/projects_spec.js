describe('Projects tests', function(){

  function login(){
    cy.route({
      method: 'POST',
      url: '/authenticate',
      status: 200,
      response: {
        'auth_token': 'token123',
        'user': {
          'id': 1,
          'name': 'Carla',
          'email': 'carla@gmail.com'
        }
      }
    }).as('login')

    cy.get('form').within(function () {
      cy.get('input:first').eq(0).should('have.attr', 'placeholder', 'Email')
        .type('carla@gmail.com').should('have.value', 'carla@gmail.com')

      cy.get('input:last').eq(0).should('have.attr', 'placeholder', 'Password')
        .type('123456789').should('have.value', '123456789')
    })

    cy.get('.falko-button').eq(0).click()
  }

  beforeEach(function(){
    cy.visit('localhost:8080/#/')
    
    cy.server()

  })
  
  it('should get projects', function(){
    cy.route({
      method: 'GET',
      url: '/users\/1/projects',
      status: 200,
      response: [
        {
          "id": 1,
          "name": "Owla",
          "description": "Improving classes",
          "user_id": 2,
        },
        {
          "id": 2,
          "name": "Falko",
          "description": "Agile Projects Manager",
          "user_id": 2,
        }
      ]
    })

    login()
    
    cy.get('.card-header').eq(0).contains('Owla')
    cy.get('.card-body').within(function(){
      cy.get('.card-text').eq(3).contains('Improving classes')
    })

    cy.get('.card-header').eq(1).contains('Falko')
    cy.get('.card-body').within(function(){
      cy.get('.card-text').eq(7).contains('Agile Projects Manager')
    })
  })
})