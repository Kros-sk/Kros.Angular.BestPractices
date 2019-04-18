export class Todo {
    id: number;
    name: string;
    description: string;
    userId?: number;
    created?: Date;
    lastChange?: Date;
}

export class NewTodo {
    name: string;
    description: string;
}

export enum TodoListFilter {
    All = 0,
    Active = 1,
    Completed = 2
}
