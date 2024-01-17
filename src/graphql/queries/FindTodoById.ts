import { gql } from "apollo-boost";

export const FIND_TODO_BY_ID = gql`

    query ($todoId: ID!) {

        findTodoById(todoId: $todoId) {

            id,

            todoTitle,

            todoDesc,

            createdAt,

            updatedAt,

            isConfirmed

        }

    }

`;
