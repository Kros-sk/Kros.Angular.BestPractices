/// <reference types="cypress" />


// Start: Application Code

var todoName = "Nova poznamka 4";
var todoDescription = "Popis poznamky";

function addNewTodo() {
    cy.get('[data-test=add-todo-item-name]').type(todoName);
    cy.get('[data-test=add-todo-item-description]').type(todoDescription);

    cy.server();
    cy.route('POST', 'ToDos').as('createRoute');
    cy.get('[data-test=add-todo-item-button]').click({force: true});
    cy.wait(['@createRoute']);
}

function setIsDoneForLastTodo() {
    cy.server();
    cy.route('PUT', 'ToDos/changeIsDoneState/*').as('updateIsDoneRoute');

    cy.get('[data-test=todo-item-is-done]')
        .last()
        .check();

    cy.wait(['@updateIsDoneRoute']);
}

// End: Application Code


describe('Todos tests', function() {
    var newTodoName = "Novy nazov poznamky";

    before(function () {
        cy.login();

        // Vstup do prihlasenej aplikacie
        cy.visit('/');
        cy.server();
        cy.route('GET', 'ToDos').as('getAllTodosRoute');

        cy.get('[data-test=app-component-todo-list-menu]').click({force: true});
        cy.wait(['@getAllTodosRoute']);
    })

    it('Pridanie novej poznamky', () => {
        addNewTodo();
    })

    it('Zeditovanie novo pridanej poznamky', () => {
        // Nova poznamka sa sice prida, ale nestihne sa vlozit do HTML DOM stromu, preto tento wait (idealne to nejako vyriesit)
        cy.wait(1000);
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

        // Zeditovanie poznamky
        cy.get('[data-test=edit-todo-name-input]')
            .clear()
            .type("Novy nazov poznamky");
        cy.get('[data-test=edit-todo-description-input]')
            .clear()
            .type("Novy popis poznamky");

        cy.server();
        cy.route('PUT', 'ToDos/*').as('updateRoute');
        cy.get('[data-test=edit-todo-save-button]').click({force: true});
        cy.wait(['@updateRoute']);

        cy.get('[data-test=todo-item-name]').last().should('have.text', newTodoName)
    })

    it('Vybavenie poslednej poznamky', () => {
        setIsDoneForLastTodo();
        cy.get('[data-test=todo-item-is-done]').should('be.checked');
    })

    it('Vymazanie novo pridanej poznamky', () => {
        cy.get('[data-test=todo-list-all-items] [data-test=todo-list-group-item] [data-test=todo-item-delete-button]')
            .last()
            .as("lastDeleteButton");

        cy.server();
        cy.route('DELETE', 'ToDos/*').as('deleteRoute');
        cy.get('@lastDeleteButton').click({force: true});
        cy.wait(['@deleteRoute']);

        cy.get('@lastDeleteButton').should('not.exist');
    })

    it('Otestovanie filtrov', () => {
        addNewTodo();
        setIsDoneForLastTodo();
        addNewTodo();
        addNewTodo();

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
        cy.route('DELETE', 'ToDos/deleteCompleted').as('deleteCompletedRoute');
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
        // Info about multiple parameters: https://docs.cypress.io/api/commands/click.html#Click-all-buttons-found-on-the-page
        cy.get('[data-test=todo-item-delete-button]').click({ multiple: true, force: true });
        cy.get('[data-test=todo-list-group-item]').should('have.length', 0);
    })
})

