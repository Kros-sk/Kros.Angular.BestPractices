// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("login", () => {
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
        window.localStorage.setItem('oidc.user:' +
            Cypress.config("OAuthUrl") + '/:' +
            Cypress.config("ProjectName"),
            '{"access_token":"' +
            user.access_token + '","token_type":"Bearer","profile":{"email":"' +
            Cypress.config("UserEmail") + '", "name":"' +
            Cypress.config("UserName") + '"}}');
    })
})
