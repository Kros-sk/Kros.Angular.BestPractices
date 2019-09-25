/// <reference types="cypress" />

describe('Prihlasenie a odhlasenie', function() {
    it('Prihlasenie a odhlasenie', () => {
        // Vstup do aplikacie pred prihlasenim
        cy.visit('/');

        cy.contains('Login').click();

        cy.get('#Email').type(Cypress.config('OAuthUsername'));
        cy.get('#Password').type(Cypress.config('OAuthPassword'));
        cy.contains('Prihlásiť').click();

        // Klik na odhlasenie
        cy.contains('Logout').click();
    })
})

