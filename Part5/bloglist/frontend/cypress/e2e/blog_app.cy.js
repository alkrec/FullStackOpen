describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`) //clears the database

    const user = {
      name: 'Johnny',
      username: 'root',
      password: 'SomePassword'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('SomePassword')
      cy.get('#login-button').click()

      cy.contains('Login Successful')
      cy.contains('Johnny logged in')
    })

    it.only('fails with wrong credentials', function() {
      cy.get('#username').type('roott')
      cy.get('#password').type('SomePassworddd')
      cy.get('#login-button').click()

      cy.get('#notification')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'border-color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html')
        .should('not.contain', 'Johnny logged in')

    })
  })
})