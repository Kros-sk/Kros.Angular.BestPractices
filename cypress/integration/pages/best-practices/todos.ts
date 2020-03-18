import { Browser } from "../browser";

export class Todos {

    private static All: string = "All";
    private static Active: string = "Active";
    private static Completed: string = "Completed";

    private static todoName: string;
    private static todoDesc: string;

    static typeInNewTodoFields(todoName: string, todoDesc: string) {
        cy.get('[data-test=add-todo-item-name]').clear().type(todoName);
        cy.get('[data-test=add-todo-item-description]').clear().type(todoDesc);
    
        Browser.setupAwaitedRoutes([
            {method: 'POST', url: /organizations\/\d+\/ToDos/ }
        ]);
        cy.get('[data-test=add-todo-item-button]').click({force: true});
        Browser.waitForRoutes();
    }

    static clickAtTodoTab() {
        cy.get('[data-test=app-component-todo-list-menu]').click({ force: true });
    }

    static shouldExistsAnyTodos() {
        cy.get('[data-test=todo-list-all-items] li')
            .should('have.length.greaterThan', 0);
    }

    static shouldTodosCount(count: number) {
        cy.get('[data-test=todo-list-all-items] li').should("have.length", count);
    }

    static shouldOnlyNotCheched() {
        cy.get('[data-test=todo-item-is-done]')
            .each(($el) => {
                cy.wrap($el).should('not.be.checked');
            });
    }

    static shouldNotExistsAnyTodos() {
        cy.get('[data-test=todo-list-group-item]').should('have.length', 0);
    }

    static setIsDoneForLastTodo() {
        Browser.setupAwaitedRoutes([
            {method: 'PUT', url: /organizations\/\d+\/ToDos\/changeIsDoneState*/ }
        ]);
        
        cy.get('[data-test=todo-item-is-done]')
            .last()
            .check();

        Browser.waitForRoutes();
    }

    static setActiveFilter() {
        Todos.setFilterType(Todos.Active);
    }

    static setAllFilter() {
        Todos.setFilterType(Todos.All);
    }

    static setCompleteFilter() {
        Todos.setFilterType(Todos.Completed);
    }

    private static setFilterType(filterType: string) {
        let dataFilterType;
        
        switch (filterType) {
            case Todos.All:
                dataFilterType = "todo-list-filter-all";
                break;
            case Todos.Active:
                dataFilterType = "todo-list-filter-active";
                break;
            case Todos.Completed:
                dataFilterType = "todo-list-filter-completed";
                break;
        }

        Browser.setupAwaitedRoutes([
            {method: 'GET', url: /organizations\/\d+\/ToDos/ }
        ]);
        cy.get(`[data-test=${dataFilterType}]`).click({force: true});
        Browser.waitForRoutes();
    }

    static deleteCompleteTodos() {
        Browser.setupAwaitedRoutes([
            {method: 'DELETE', url: /organizations\/\d+\/ToDos\/deleteCompleted/ }
        ]);
        cy.get("[data-test=todo-list-delete-completed-button]").click({force: true});
        Browser.waitForRoutes();
    }

    static editLastTodo(todoName: string, todoDesc: string) {
        this.todoName = todoName;
        this.todoDesc = todoDesc;

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
            .type(todoName);
        cy.get('[data-test=edit-todo-description-input]')
            .clear()
            .type(todoDesc);


        Browser.setupAwaitedRoutes([
            {method: 'PUT', url: /organizations\/\d+\/ToDos/ }
        ]);
        cy.get('[data-test=edit-todo-save-button]').click({force: true});
        Browser.waitForRoutes();
    }

    static shouldLastTodoHasNewValues() {
        cy.get('[data-test=todo-item-name]').last().should('have.text', this.todoName);

        cy.get('[data-test=todo-list-all-items] [data-test=todo-list-group-item]:last-child [data-test=todo-item-edit-button]')
            .last()
            .as("lastEditButton");
        cy.get('@lastEditButton').scrollIntoView();
        cy.get('@lastEditButton').click({force: true});

        cy.get('[data-test=edit-todo-description-input]').should("have.value", this.todoDesc);

        cy.get('[data-test=edit-todo-close-button-top-right]').click({force: true});
    }

    static deleteAllTodos() {
        cy.get('[data-test=todo-list-all-items]').then((container) => {
            if (container.children().length) {
                // Info about multiple parameters: https://docs.cypress.io/api/commands/click.html#Click-all-buttons-found-on-the-page
                cy.get('[data-test=todo-item-delete-button]').click({ multiple: true, force: true });
                cy.get('[data-test=todo-list-group-item]').should('have.length', 0);
            }
        })
    }
}