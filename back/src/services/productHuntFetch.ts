import { gql } from 'graphql-request';

import GraphQlClient from '../config/graphqlClient';

export function fetchProductByDate(after: string, before: string) {
  const query = { after, before };

  const document = gql`
    query getProductByDate($after: DateTime, $before: DateTime) {
      posts(featured: true, order: FEATURED_AT, postedAfter: $after, postedBefore: $before) {
        totalCount
        edges {
          cursor
          node {
            name
            url
            featuredAt
            description
            commentsCount
            reviewsCount
            reviewsRating
            media {
              url
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

  return GraphQlClient.request<QueryType>(document, query);
}
