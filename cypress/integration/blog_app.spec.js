describe('Test for blog app', function() {
  beforeEach( function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', { name: 'dastan', username:'root', password: 'Messi' })
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
  })
  it('Login page by default', function() {
    cy.get('form').should('contain', 'username')
  })

  describe('Login ', function() {
    it('Succesfull login', function {
      cy.get('#username').type('root')
      cy.get('#password').type('Messi')
      cy.get('#submit-login').click()

      cy.contains('dastan is logged in')
    })
    it('Wrong credentials', function{
      cy.get('#username').type('root')
      cy.get('#password').type('messi')
      cy.get('#submit-login').click()

      cy.get('#notif-div').contains('Wrong credentials')
    })
  }
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'Messi' })
    })
    it('user can create a blog', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Blog by test')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('cypress.io')

      cy.get('#submit-blog').click()

      cy.get('#notif-div').contains('Blog by test by Cypress is added')

      cy.contains('show all blogs').click()
      cy.contains('Blog by test')
    })
  })
})