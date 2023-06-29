import { fetchCollections } from '../collections';

// Test based on the result of query runned on https://ph-graph-api-explorer.herokuapp.com/ platform
describe('PH fetching collections', () => {
  it('should return all collections with their posts', async () => {
    const { collections } = await fetchCollections();

    expect(collections.totalCount).toBe(20); // Check number of collecitons
    expect(collections.edges[0].node.posts.totalCount).toBeDefined(); // Check if post count is not null
    expect(collections.edges[0].node.posts.totalCount).toBe(20); // Check if post count is not null
  });
});
