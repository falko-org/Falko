describe('Authorization tests', function (){
  beforeEach(function(){
    cy.visit('localhost:8080/#/')
  
    cy.server()
    
    // Stubing server response
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
  })
  
  it('should access homepage', function(){

    cy.title().should('include', 'Falko')
    
    cy.get('#loginRegisterComponent').within(function(){
      cy.get('#loginForm').within(function(){
        cy.get('.falko-button').eq(0).contains('Log In')
      })
    })
    
    cy.get('h1').eq(0).contains('Start now!')
    cy.get('h1').eq(1).contains('Free Software')
    cy.get('h1').eq(2).contains('See beyond')
  })

  it('should log in user', function(){
    cy.get('form').within(function () {
      cy.get('input:first').eq(0).should('have.attr', 'placeholder', 'Email')
        .type('carla@gmail.com').should('have.value', 'carla@gmail.com')
      
      cy.get('input:last').eq(0).should('have.attr', 'placeholder', 'Password')
        .type('123456789').should('have.value', '123456789')
    })
    
    cy.get('.falko-button').eq(0).click()

    cy.url().should('eq', 'http://localhost:8080/#/projects')
  })

  it('should not log in invalid user', function(){
    cy.route({
      method: 'POST',
      url: '/authenticate',
      status: 401,
      response: {
        "error": {
          "user_authentication": [
            "invalid credentials"
          ]
        }
      }
    }).as('invalidLogin')

    cy.get('form').within(function () {
      cy.get('input:first').eq(0).should('have.attr', 'placeholder', 'Email')
        .type('invalid@gmail').should('have.value', 'invalid@gmail')

      cy.get('.text-danger').contains('The email field must be a valid email.')
      
      cy.get('input:first').eq(0).should('have.attr', 'placeholder', 'Email')
        .type('.com').should('have.value', 'invalid@gmail.com')
      
      cy.get('input:last').eq(0).should('have.attr', 'placeholder', 'Password')
        .type('12345').should('have.value', '12345')
        
      cy.get('.text-danger').contains('The password field must be at least 6 characters.')
      
      cy.get('input:last').eq(0).should('have.attr', 'placeholder', 'Password')
        .type('6').should('have.value', '123456')
    })
    
    cy.get('.falko-button').eq(0).click()

    cy.get('.text-danger').contains('Wrong Credentials')

    cy.url().should('eq', 'http://localhost:8080/#/')
  })

  it('should register user', function(){
    // Stubing server response
    cy.route({
      method: 'POST',
      url: '/users',
      status: 200,
      response: {
        'auth_token': 'token123',
        'user': {
          'id': 1,
          'name': 'Carla',
          'email': 'carla@gmail.com'
        }
      }
    }).as('register')

    cy.get('#pills-register-tab').click()

    cy.get('form').within(function () {
      cy.get('input').eq(2).should('have.attr', 'placeholder', 'Username')
        .type('Carla').should('have.value', 'Carla')

      cy.get('input').eq(3).should('have.attr', 'placeholder', 'Enter email')
        .type('carla@gmail.com').should('have.value', 'carla@gmail.com')
      
      cy.get('input').eq(4).should('have.attr', 'placeholder', 'Password')
        .type('123456789').should('have.value', '123456789')
      
      cy.get('input').eq(5).should('have.attr', 'placeholder', 'Confirm Password')
        .type('123456789').should('have.value', '123456789')
      
      cy.get('input').eq(6).should('have.attr', 'placeholder', 'GitHub')
        .type('carlaGit').should('have.value', 'carlaGit')
    })
    
    cy.get('.falko-button').eq(1).click()

    cy.url().should('eq', 'http://localhost:8080/#/projects')
  })

  it('should not register invalid user', function(){
    // Stubing server response
    cy.route({
      method: 'POST',
      url: '/users',
      status: 401,
      response: {}
    }).as('invalidRegister')

    cy.get('#pills-register-tab').click()

    cy.get('form').within(function () {
      cy.get('input').eq(2).should('have.attr', 'placeholder', 'Username')
        .type('Carla').should('have.value', 'Carla')

      cy.get('input').eq(3).should('have.attr', 'placeholder', 'Enter email')
        .type('carla@gmail').should('have.value', 'carla@gmail')
      
      cy.get('input').eq(4).should('have.attr', 'placeholder', 'Password')
        .type('12345').should('have.value', '12345')
      
      cy.get('input').eq(5).should('have.attr', 'placeholder', 'Confirm Password')
        .type('1234').should('have.value', '1234')
      
      cy.get('input').eq(6).should('have.attr', 'placeholder', 'GitHub')
        .type('carlaGit').should('have.value', 'carlaGit')
    })
    
    cy.get('.falko-button').eq(1).click()

    cy.url().should('eq', 'http://localhost:8080/#/')
  })
})
