Cypress.Commands.add('logInCmd', () => {

    const { username, password } = Cypress.env('credentials');
        cy.intercept('POST', 'login', {
            statusCode: 200,
            body: {
                'access': 'ACCESS_TOKEN',
                'refresh': 'REFRESH_TOKEN'
            }
        }).as('logIn');

    cy.visit('/#/log-in');
    cy.get('input#username').type(username);
    cy.get('input#password').type(password, { log: false });
    cy.get('button').contains('Login').click();
    cy.wait('@logIn');
});