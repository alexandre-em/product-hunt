import { gql } from 'graphql-request';

import GraphQlClient from '../config/graphqlClient';

export function fetchProductByDate(after: string, before: string, next = '') {
  const query = { after, before, next };

  const document = gql`
    query getProductByDate($after: DateTime, $before: DateTime, $next: String) {
      posts(featured: true, order: FEATURED_AT, postedAfter: $after, postedBefore: $before, after: $next) {
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
