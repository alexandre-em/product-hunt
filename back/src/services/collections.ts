import { gql } from 'graphql-request';

import GraphQlClient from '../config/graphqlClient';

export function fetchCollections() {
  // Show all collections with the id, name, cover image and also the number of posts for each collections
  const document = gql`
    {
      collections {
        totalCount
        edges {
          cursor
          node {
            id
            name
            coverImage
            posts {
              totalCount
            }
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasPreviousPage
          hasNextPage
        }
      }
    }
  `;

  return GraphQlClient.request<QueryType>(document);
}
