// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

require('cypress-plugin-retries')


export function addNewTodo() {
    cy.get('[data-test=add-todo-item-name]').type('Nova poznamka');
    cy.get('[data-test=add-todo-item-description]').type('Popis poznamky');

    cy.server();
    cy.route('POST', '**ToDos').as('createRoute');
    cy.get('[data-test=add-todo-item-button]').click({force: true});
    cy.wait(['@createRoute']);
}

export function setIsDoneForLastTodo() {
    cy.server();
    cy.route('PUT', /organizations\/\d+\/ToDos\/changeIsDoneState*/).as('updateIsDoneRoute');

    cy.get('[data-test=todo-item-is-done]')
        .last()
        .check();

    cy.wait(['@updateIsDoneRoute']);
}
