import { gql } from "apollo-boost";

export const UPDATE_TODO_BY_ID = gql`

    mutation ($todoInput: TodoInput!) {

        updateTodoById(todoInput: $todoInput) {

            id,

            todoTitle,

            todoDesc,

            createdAt,

            updatedAt,

            isConfirmed

        }

    }

`;
