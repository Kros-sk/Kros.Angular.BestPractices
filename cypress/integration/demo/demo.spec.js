/// <reference types="cypress" />

describe('Demo tests', function() {
    context('AutoLogin', () => {
        before(function fetchUser () {
            cy.request({
                method: 'POST',
                url: Cypress.config("OAuthUrl") + '/connect/token',
                headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
                },
                body: {
                mode: 'urlencoded',
                client_id: Cypress.config("OAuthClientId"),
                grant_type: 'password',
                username: Cypress.config("OAuthUsername"),
                password: Cypress.config("OAuthPassword")
                }
            })
            .its('body')
            .then((res) => {
                let user = res;
                window.localStorage.setItem('oidc.user:' + Cypress.config("OAuthUrl") + '/:' + Cypress.config("ProjectName"),
                '{"access_token":"' + user.access_token + '","token_type":"Bearer","profile":{"email":"integrationtests@kros.sk", "name":"Integration Tests"}}');
            })
        })

        it('Zobrazenie logout tlacidla', () => {
            // Vstup do prihlasenej aplikacie
            cy.visit('/');

            cy.get('.d-flex > .btn').should("exist");

            // // Klik na odhlasenie
            // cy.get('.d-flex > .btn').click();

            // // Presmerovanie na hlavnu stranku (bez prihlasenia)
            // cy.visit('https://demo.todos.kros.wtf');
        })

        it('Odhlasenie', () => {
            // // Klik na odhlasenie
            // cy.get('.d-flex > .btn').click();

            // // // Presmerovanie na hlavnu stranku (bez prihlasenia)
            // cy.visit('/');
        })
    })
})

