/// <reference types="cypress" />

describe('App tests', function() {
    context('AutoLogin', () => {
        before(function () {
            cy.login();
        })

        it('Skontrolovanie menu aplikacie', () => {
            // Vstup do prihlasenej aplikacie
            cy.visit('/');

            cy.get('.badge > :nth-child(1)').contains(Cypress.config("UserName"));
            cy.get('.badge > :nth-child(2)').contains(Cypress.config("UserEmail"));
            cy.get('.d-flex > .btn').should("exist");
        })
    })
})

