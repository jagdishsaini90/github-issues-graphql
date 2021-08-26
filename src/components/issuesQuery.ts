import { gql } from "@apollo/client";

export const getIssues = gql`
  query GETISSUES(
    $name: String!
    $owner: String!
    $author: String
    $labels: [String!]
    $order: OrderDirection!
  ) {
    repository(name: $name, owner: $owner) {
      issues(
        first: 100
        states: OPEN
        filterBy: { createdBy: $author, labels: $labels }
        orderBy: { field: CREATED_AT, direction: $order }
      ) {
        totalCount
        nodes {
          author {
            login
          }
          createdAt
          title
          labels(first: 10) {
            nodes {
              color
              name
            }
          }
        }
      }
    }
  }
`;
