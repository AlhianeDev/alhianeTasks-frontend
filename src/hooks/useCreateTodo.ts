import { useMutation } from "@apollo/client";

import { CREATE_TODO } from "../graphql/mutations/CreateTodo";

import { TodoDto, TodoInput } from "../types/TodoTypes";

import { FIND_TODOS } from "../graphql/queries/FindTodos";

import useLocalStorage from "./useLocalStorage";

import { initialCursor } from "../types/paginationTypes";

export const useCreateTodo = () => {

    const [cursor] = useLocalStorage("cursor", initialCursor);

    return useMutation<TodoDto, TodoInput>(

        CREATE_TODO,

        { refetchQueries: [{ query: FIND_TODOS, variables: cursor}] }

    );

}
