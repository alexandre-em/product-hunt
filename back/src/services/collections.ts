import { gql } from 'graphql-request';

import GraphQlClient from '../utils/graphqlClient';

export function fetchProductByDate(date: Date) {
  const query = { featuredAt: `${date}` };

  // TODO: Create a worker to count on a efficient way each collections posts (ex: Save the result on JSON file)
  // Show all collections with the id, name and cover image and also the number of posts for each collections
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
          }
        }
        nodes {
          id
          posts {
            totalCount
          }
        }
      }
    }
  `;

  return GraphQlClient.request<any>(document, query);
}
