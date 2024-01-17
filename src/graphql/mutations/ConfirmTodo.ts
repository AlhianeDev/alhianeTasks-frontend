import { gql } from "apollo-boost";

export const CONFIRM_TODO_BY_ID = gql`

    mutation ($todoId: ID!) {

        confirmTodoById(todoId: $todoId)

    }

`;
