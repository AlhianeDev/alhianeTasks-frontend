import { gql } from "apollo-boost";

export const FIND_TODOS = gql`

    query($first: Int, $after: String, $last: Int, $before: String, $skip: Int) {

        findTodos(first: $first, after: $after, last: $last, before: $before, skip: $skip) {

            totalTodos,

            edges {

                cursor

                node {

                    id,

                    todoTitle,

                    todoDesc,

                    createdAt,

                    updatedAt,

                    isConfirmed

                }

            },

            pageInfo {

                startCursor

                endCursor

                hasNextPage

                hasPreviousPage

            }

        }

    }

`;
