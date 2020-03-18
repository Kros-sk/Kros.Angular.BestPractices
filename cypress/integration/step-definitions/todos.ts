import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { BestPracticesHeader } from '../pages/best-practices/best-practices-header';
import { Todos } from '../pages/best-practices/todos';
import { App } from '../pages/best-practices/app';

Given('kliknem na záložku poznámky', () => {
    BestPracticesHeader.clickAtTodos();
});

Given('vymažem všetky poznámky', () => {
    cy.wait(300); // Waiting for add items to DOM
    Todos.deleteAllTodos();
});



When('vložím poznámku {string} s popisom {string}', (todoName: string, todoDesc: string) => {
    Todos.typeInNewTodoFields(todoName, todoDesc);
});

When("vložím poznámky s týmito údajmi:", (dataTable) => {
    dataTable.rawTable.slice(1).forEach((row: string[]) => {
        Todos.typeInNewTodoFields(row[0], row[1]);
    });
});

When("poslednú poznámku nastavím ako ukončenú", () => {
    cy.wait(300); // Waiting for add items to DOM
    Todos.setIsDoneForLastTodo();
});

When("zvolím si filter {string}", (filterType: string) => {
    switch (filterType) {
        case 'All':
            Todos.setAllFilter();
            break;
        case 'Active':
            Todos.setActiveFilter();
            break;
        case 'Completed':
            Todos.setCompleteFilter();
            break;
    }
});

When("kliknem na vymazanie ukončených poznámok", () => {
    Todos.deleteCompleteTodos();
});

When("zmením poslednú poznámku tak, že názov nastavím na {string} a popis na {string}", (todoName: string, todoDesc: string) => {
    Todos.editLastTodo(todoName, todoDesc);
});



Then('v zozname sa zobrazia iba neukončené poznámky', () => {
    cy.wait(300); // Waiting for add items to DOM
    Todos.shouldOnlyNotCheched();
});

Then('počet odfiltrovaných poznámok je {string}', (todosCount: string) => {
    Todos.shouldTodosCount(parseInt(todosCount));
});

Then('v zozname sa zobrazia tieto nové poznámky', () => {
    Todos.shouldExistsAnyTodos();
});

Then('poznámky existujú aj po refreshnutí appky', () => {
    App.reloadAppAndGoToTodos();
    Todos.shouldExistsAnyTodos();
});

Then('neexistujú žiadne poznámky', () => {
    Todos.shouldNotExistsAnyTodos();
});

Then('poznámky neexistujú ani po refreshnutí appky', () => {
    App.reloadAppAndGoToTodos();
    Todos.shouldNotExistsAnyTodos();
});

Then('sa tieto hodnoto zmenia', () => {
    Todos.shouldLastTodoHasNewValues();
});

Then('sú zmenené aj po refreshnutí stránky', () => {
    App.reloadAppAndGoToTodos();
    Todos.shouldLastTodoHasNewValues();
});