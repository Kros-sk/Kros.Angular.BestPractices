/// <reference types="cypress" />

describe('App tests', function() {
    context('AutoLogin', () => {
        before(function () {
            cy.login();
        })

        it('Skontrolovanie menu aplikacie', () => {
            // Vstup do prihlasenej aplikacie
            cy.visit('/');

            cy.get('[data-test=app-component-user-name]').contains(Cypress.config("UserName"));
            cy.get('[data-test=app-component-user-email]').contains(Cypress.config("UserEmail"));
            cy.get('[data-test=app-component-logout-button]').should("exist");
        })
    })
})

