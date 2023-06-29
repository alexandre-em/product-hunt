import { gql } from 'graphql-request';

import GraphQlClient from '../utils/graphqlClient';

export function fetchProductByDate(after: string, before: string) {
  const query = { postedAfter: after, postedBefore: before };

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
      }
    }
  `;

  return GraphQlClient.request<any>(document, query);
}
