import { gql } from 'graphql-request';

import GraphQlClient from '../utils/graphqlClient';

// TODO: Create a worker to save each posts with a CRON at every night (ex: on JSON file/database if have time)
export function fetchProductByDate(date: Date) {
  const query = { featuredAt: `${date}` };

  const document = gql`
    query getProductByDate($featuredAt: DateTime) {
      posts(featured: true, order: FEATURED_AT, postedAfter: "2023-06-22T00:00:00Z", postedBefore: "2023-06-22T23:59:59Z") {
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
