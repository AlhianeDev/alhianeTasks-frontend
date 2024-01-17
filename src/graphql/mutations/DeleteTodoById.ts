import { gql } from "apollo-boost";

export const DELETE_TODO_BY_ID = gql`

    mutation ($todoId: ID!) {

        deleteTodoById(todoId: $todoId)

    }

`;
