describe('Test for blog app', () => {
  beforeEach( function() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  
})