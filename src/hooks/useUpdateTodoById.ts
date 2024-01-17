import { useMutation } from "@apollo/client";

import { TodoDto, TodoInput } from "../types/TodoTypes";

import { UPDATE_TODO_BY_ID } from "../graphql/mutations/UpdateTodoById";

import { FIND_TODOS } from "../graphql/queries/FindTodos";

export const useUpdateTodoById = () => {

    return useMutation<TodoDto, TodoInput>(

        UPDATE_TODO_BY_ID,

        { refetchQueries: [{ query: FIND_TODOS }] }

    )

}
