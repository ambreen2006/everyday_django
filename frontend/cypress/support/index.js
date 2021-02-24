Cypress.Commands.add('logInCmd', () => {

    const { username, password } = Cypress.env('credentials');
        cy.intercept('POST', 'login').as('logIn');

    cy.visit('/#/log-in');
    cy.get('input#username').type(username);
    cy.get('input#password').type(password, { log: false });
    cy.get('button').contains('Login').click();
    cy.wait('@logIn');
});
