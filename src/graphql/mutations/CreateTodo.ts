import { gql } from "apollo-boost";

export const CREATE_TODO = gql`

    mutation ($todoInput: TodoInput!) {

        createTodo(todoInput: $todoInput) {

            id,

            todoTitle,

            todoDesc,

            createdAt,

            updatedAt,

            isConfirmed

        }

    }

`;
