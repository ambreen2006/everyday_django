describe('Authentication', function() {

    it('Show invalid fields on signup error', function() {
        cy.intercept('POST', 'users', {
            statusCode: 400,
            body: {
                'username': ['A user with that name already exists']
            }
        }).as('signUp');

        cy.visit('signUp');
        cy.visit('/#/sign-up');
        cy.get('input#username').type('test1@everydayapps.com');
        cy.get('input#firstName').type('Test');
        cy.get('input#lastName').type('User');
        cy.get('input#password').type('pAssw0rd', { log: false });
        cy.get('button').contains('Sign Up').click();
        cy.wait('@signUp');
        cy.get('div.invalid-feedback').contains('A user with that name already exists');
        cy.hash().should('eq', '#/sign-up');
    });

    it('Can log in', function() {
        cy.logInCmd();
        cy.hash().should('eq', '#/');
        cy.get('button').contains('Logout');
    });

    it('Can sign up', function() {

        cy.intercept('POST', 'users', {
            statusCode: 201,
            body: {
                'id': 1,
                'username': 'test@everydayapps.com',
                'first_name': 'Test',
                'last_name': 'User',
            }
        }).as('signUp');

        cy.visit('/#/sign-up');
        cy.get('input#username').type('test2@everydayapps.com');
        cy.get('input#firstName').type('Test2');
        cy.get('input#lastName').type('User');
        cy.get('input#password').type('pAssw0rd', {log: false});
        cy.get('button').contains('Sign Up').click();
        cy.wait('@signUp');
        cy.hash().should('eq', '#/log-in');
    });

    it('Cannot visit the login page when logged in', function() {
        cy.logInCmd();
        cy.visit('/#/log-in');
        cy.hash().should('eq', '#/');
    });

    it('Shows an alert on login error', function() {

        const { username, password } = Cypress.env('credentials');
        cy.intercept('POST', 'login', {
            statusCode: 400,
            body: {
                'detail': 'Wrong credentials'
            }
        }).as('logIn');

        cy.visit('/#/log-in');
        cy.get('input#username').type(username);
        cy.get('input#password').type(password, {log: false});
        cy.get('button').contains('Login').click();

        cy.wait('@logIn');
        cy.get('div.alert').contains(
            'Wrong credentials'
        );
        cy.hash().should('eq', '#/log-in');
    });

    it('Can log out', function() {
        cy.logInCmd();
        cy.get('button').contains('Logout').click().should(()=> {
            expect(window.localStorage.getItem('everydayapps.auth')).to.be.null;
        });
        cy.get('button').contains('Logout').should('not.exist');
    });

});