describe('Note app', function() {
  const user1 = {
    name: 'Johnny',
    username: 'root',
    password: 'SomePassword'
  }

  const user2 = {
    name: 'Second User',
    username: 'second_user',
    password: 'SomePassword'
  }

  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`) //clears the database

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
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

    it('fails with wrong credentials', function() {
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'SomePassword' })
      // cy.login({ username: 'second_user', password: 'SomePassword' })
    })

    it('A blog can be created', function() {
      cy.contains('create new').click()

      cy.get('#title-input').type('some title')
      cy.get('#author-input').type('some author')
      cy.get('#url-input').type('some url')
      cy.get('#submit-button').click()

      cy.contains('some title')
      cy.contains('some author')
    })

    describe('logged in user and blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Some title',
          author: 'Some author',
          url: 'Some url',
          likes: 0,
        })

        cy.createBlog({
          title: 'Some title1',
          author: 'Some author1',
          url: 'Some url1',
          likes: 0,
        })

        cy.createBlogFromDifferentUser({
          username: 'second_user',
          password: 'SomePassword',
          title: 'Some title2',
          author: 'Some author2',
          url: 'Some url2',
          likes: 0,
        })
      })

      it('user can like a blog', function() {
        cy.contains('Some author1').parent().find('button').click()
        cy.contains('Some author1').parent().parent().find('.like-button').click()

        cy.contains('Some author1').parent().parent().contains(1) //check if likes on blog is 1
      })

      it('user can delete blog if they created it', function() {
        cy.contains('Some author1').parent().find('button').click()
        cy.contains('Some author1').parent().parent().find('.remove-button').click()

        cy.should('not.contain', 'Some author1') //check if blog is no longer present
      })

      it.only('delete button visible only to user who created it', function() {
        cy.contains('Some author1').parent().find('button').click()
        cy.contains('Some author1').parent().parent().find('.remove-button') //checks to see if remove button is visible to user who created it

        cy.contains('Some author2').parent().find('button').click()
        cy.contains('Some author2').parent().parent().should('not.contain', 'remove')
      })
    })
  })
})