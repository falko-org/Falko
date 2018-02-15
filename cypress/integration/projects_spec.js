describe('Projects tests', function(){
  beforeEach(function(){
    cy.server()

    cy.route({
      method: 'GET',
      url: '/users\/1/projects',
      status: 200,
      response: 'fixture:projects.json'
    }).as('getProjects')
  })

  it('should get projects', function(){

    cy.login()

    cy.get('.card-header').eq(0).contains('Owla')
    cy.get('.card-body').within(function(){
      cy.get('.card-text').eq(0).contains('Improving classes')
    })

    cy.get('.card-header').eq(1).contains('Falko')
    cy.get('.card-body').within(function(){
      cy.get('.card-text').eq(1).contains('Agile Projects Manager')
    })
  })

  it('should add a project', function() {
    cy.route({
      method: 'POST',
      url: '/users\/1/projects',
      status: 200,
      response: [
        {
          "id": 1,
          "name": "Owla",
          "description": "Improving classes",
          "user_id": 1,
        },
        {
          "id": 2,
          "name": "Falko",
          "description": "Agile Projects Manager",
          "user_id": 1,
        },
        {
          "id": 3,
          "name": "NewProject",
          "description": "New Project Description",
          "user_id": 1,
        }
      ]
    }).as('addProject')

    cy.login()

    cy.get('.falko-button').eq(0).click()

    cy.get('.modal-body').within(function(){
      cy.get('input:first').type('NewProject')
      cy.get('input:last').type('New Project Description')

    })

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
        },
        {
          "id": 3,
          "name": "NewProject",
          "description": "New Project Description",
          "user_id": 2,
        }
      ]
    }).as('newGetProjects')

    cy.get('.modal-footer').within(function(){
      cy.get('.falko-button').eq(0).click()
    })

    cy.wait('@newGetProjects')

    cy.get('.card-header').eq(0).contains('Owla')
    cy.get('.card-header').eq(1).contains('Falko')
    cy.get('.card-header').eq(2).contains('NewProject')
    cy.get('.card-body').within(function () {
      cy.get('.card-text').eq(2).contains('New Project Description')
    })
  })

  it('should cancel add project process', function () {

    cy.login()

    cy.get('#addButton').contains('Add a Project').click()

    cy.wait(200)

    cy.get('.modal-footer').eq(0).within(function () {
      cy.get('.falko-button-grey').contains('Close').click()
    })

    cy.get('.card-header').eq(0).contains('Owla')
    cy.get('.card-header').eq(1).contains('Falko')
  })

  it('should edit a project', function(){
    cy.login()

    cy.route({
      method: 'GET',
      url: '/projects\/2',
      status: 200,
      response: 'fixture:project.json'
    }).as('getProject')

    cy.get('.card-body').eq(1).click()

    cy.wait('@getProject')

    cy.get('.card-title').contains('Falko')
    cy.get('.card-text').contains('Agile Projects Manager')

    cy.get('#editbutton').eq(0).click()
    cy.wait(2000)
    cy.get('.modal-header').eq(1).contains('Edit Project')

    cy.get('input').eq(0).type(' plus').should('have.value','Falko plus')
    cy.get('input').eq(1).type(' plus').should('have.value','Agile Projects Manager plus')

    cy.get('.v-switch-label').contains('off')

    cy.route({
      method: 'PUT',
      url: '/projects\/2',
      status: 200,
      response:
        {
          "description":"AAgile Projects Manager plus" ,
          "github_slug": "fga-gpp-mds/owla",
          "id":2,
          "is_project_from_github":true,
          "is_scoring":false,
          "name":"Falko plus",
          "user_id":1,
        },
    }).as('updateProject')

    cy.route({
      method: 'GET',
      url: '/projects\/2',
      status: 200,
      response:
        {
          "description":"Agile Projects Manager plus" ,
          "github_slug": "fga-gpp-mds/owla",
          "id":2,
          "is_project_from_github":true,
          "is_scoring":false,
          "name":"Falko plus",
          "user_id":1,
        }
    }).as('getProjectUp')


    cy.get('#editFooterModal').within(function(){
      cy.get('.falko-button').eq(0).contains('Save').click()
    })

    cy.wait('@getProjectUp')

    cy.get('.card-title').contains('Falko plus')
    cy.get('.card-text').contains('Agile Projects Manager plus')
  })

  it('should delete project', function(){
    cy.login()

    cy.route({
      method: 'GET',
      url: '/projects\/1',
      status: 200,
      response: 'fixture:project.json'
    }).as('getProject')

    cy.route({
      method: 'DELETE',
      url: '/projects/1',
      status: 200,
      response: {}
    }).as('deleteProject')


    cy.get('.card-header').eq(0).contains('Owla').click()

    cy.route({
      method: 'GET',
      url: '/users\/1/projects',
      status: 200,
      response: [{
        "id": 2,
        "name": "Falko",
        "description": "Agile Projects Manager",
        "user_id": 2
      }]
    }).as('getProjectsAfterDelete')

    cy.get('#deletebutton').contains('Delete').click()

    cy.wait(200)

    cy.get('#deleteFooterModal').within(function(){
      cy.get('.falko-button').click()
    })

    cy.get('.card-header').contains('Falko')
  })
})
