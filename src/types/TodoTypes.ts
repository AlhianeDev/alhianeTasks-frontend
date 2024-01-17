export type TodoDto = {

    id: string;

    todoTitle: string;

    todoDesc: string;

    createdAt: string;

    updatedAt: string;

    isConfirmed: boolean;

}

export type TodoInput = {

    todoInput: {

        id?: string;

        todoTitle: string;

        todoDesc: string;

    }

}
