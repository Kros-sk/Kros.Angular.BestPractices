export class TodoItem {
    id: number;
    name: string;
    description: string;
    created: string;
    lastChange: string;
    userId: number;
    isDone: boolean;
}

export class TodoListItem {
    id: number;
    name: string;
    isDone: boolean;
}

export class NewTodoItem {
    name: string;
    description: string;
}

export class UpdateTodoItem {
    id: number;
    name: string;
    description: string;
    isDone: boolean;
}

export enum TodoListFilter {
    All = 0,
    Active = 1,
    Completed = 2
}
