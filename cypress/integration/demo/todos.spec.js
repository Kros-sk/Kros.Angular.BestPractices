/// <reference types="cypress" />

import * as todoPage from "../../support";

describe('Todos tests', function() {
    before(function () {
        cy.login();

        // Vstup do prihlasenej aplikacie
        cy.server();
        cy.route({
            method: 'GET',
            url: /organizations/}).as('getAllOrganizations');
            cy.visit('/company/list');
        cy.wait(['@getAllOrganizations']);
    })

    it('Zvolenie prvej organizacie', () => {
        cy.get('.actions > :nth-child(1)').click();

        cy.server();
        cy.route({
            method: 'GET',
            url: /organizations\/\d+\/ToDos/}).as('getAllTodosRoute');
        cy.get('[data-test=app-component-todo-list-menu]').click({ force: true });
        cy.wait(['@getAllTodosRoute']);
    })

    it('Pridanie novej poznamky', () => {
        todoPage.addNewTodo();

        // Nova poznamka sa sice prida, ale nestihne sa vlozit do HTML DOM stromu, preto tento wait (idealne to nejako vyriesit)
        //cy.reload();
        //cy.wait(1000);
        cy.get('[data-test=todo-list-all-items] li')
            .should('have.length', 1);
    })

    it('Zeditovanie poslednej poznamky', () => {
        cy.get('[data-test=todo-list-all-items] [data-test=todo-list-group-item]:last-child [data-test=todo-item-name]')
            .last()
            .as("lastTodoName");

        cy.get('[data-test=todo-list-all-items] [data-test=todo-list-group-item]:last-child [data-test=todo-item-edit-button]')
            .last()
            .as("lastEditButton");
        cy.get('@lastEditButton').scrollIntoView();
        cy.get('@lastEditButton').click({force: true});

        // Klik na Close button
        cy.get('[data-test=edit-todo-close-button-bottom-left]').click({force: true});
        cy.get('@lastEditButton').click({force: true});

        // Klik na horny krizik
        cy.get('[data-test=edit-todo-close-button-top-right]').click({force: true});
        cy.get('@lastEditButton').click({force: true});

        const newTodoName = 'Novy nazov poznamky';
        const newTodoDesc = 'Novy popis poznamky';

        // Zeditovanie poznamky
        cy.get('[data-test=edit-todo-name-input]')
            .clear()
            .type(newTodoName);
        cy.get('[data-test=edit-todo-description-input]')
            .clear()
            .type(newTodoDesc);

        cy.server();
        cy.route('PUT', /organizations\/\d+\/ToDos/).as('updateRoute');
        cy.get('[data-test=edit-todo-save-button]').click({force: true});
        cy.wait(['@updateRoute']);

        cy.get('[data-test=todo-item-name]').last().should('have.text', newTodoName)
    })

    it('Vybavenie poslednej poznamky', () => {
        todoPage.setIsDoneForLastTodo();
        cy.get('[data-test=todo-item-is-done]').should('be.checked');
    })

    it('Vymazanie poslednej poznamky', () => {
        cy.get('[data-test=todo-list-all-items] [data-test=todo-list-group-item] [data-test=todo-item-delete-button]')
            .last()
            .as("lastDeleteButton");

        cy.server();
        cy.route('DELETE', /organizations\/\d+\/ToDos*/).as('deleteRoute');
        cy.get('@lastDeleteButton').click({force: true});
        cy.wait(['@deleteRoute']);

        cy.get('@lastDeleteButton').should('not.exist');
    })

    it('Otestovanie filtrov', () => {
        todoPage.addNewTodo();
        todoPage.setIsDoneForLastTodo();
        todoPage.addNewTodo();
        todoPage.addNewTodo();

        // Active filter
        cy.server();
        cy.route('GET', 'ToDos').as('getAllTodosRoute');
        cy.get('[data-test=todo-list-filter-active]').click({force: true});
        cy.wait(['@getAllTodosRoute']);

        cy.get('[data-test=todo-item-is-done]')
            .each(($el) => {
                cy.wrap($el).should('not.be.checked');
            });

        // Completed filter
        cy.get('[data-test=todo-list-filter-completed]').click({force: true});
        cy.wait(['@getAllTodosRoute']);

        cy.get('[data-test=todo-item-is-done]')
            .each(($el) => {
                cy.wrap($el).should('be.checked');
            });
    })

    it('Vymazanie hotovych poznamok', () => {
        cy.server();
        cy.route('DELETE', /organizations\/\d+\/ToDos\/deleteCompleted/).as('deleteCompletedRoute');
        cy.get('[data-test=todo-list-delete-completed-button]').click({force: true});
        cy.wait(['@deleteCompletedRoute']);

        // All filter
        cy.server();
        cy.route('GET', 'ToDos').as('getAllTodosRoute');
        cy.get('[data-test=todo-list-filter-all]').click({force: true});
        cy.wait(['@getAllTodosRoute']);

        cy.get('[data-test=todo-item-is-done]')
            .each(($el) => {
                cy.wrap($el).should('not.be.checked');
            });
    })

    it('Vymazanie vsetkych poznamok postupne', () => {
        deleteAllTodos();
    })

    function deleteAllTodos() {
        // Info about multiple parameters: https://docs.cypress.io/api/commands/click.html#Click-all-buttons-found-on-the-page
        cy.get('[data-test=todo-item-delete-button]').click({ multiple: true, force: true });
        cy.get('[data-test=todo-list-group-item]').should('have.length', 0);
    }
})

