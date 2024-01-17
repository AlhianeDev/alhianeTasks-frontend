import { gql } from "apollo-boost";

export const FIND_ALL_TODOS = gql`

    query {

        findAllTodos {

            id,

            todoTitle,

            todoDesc,

            createdAt,

            updatedAt,

            isConfirmed

        }

    }

`;
