import { fetchCollections } from '../collections';

// Test based on the result of query runned on https://ph-graph-api-explorer.herokuapp.com/ platform
describe('PH fetching collections', () => {
  it('should return all collections with their posts', async () => {
    const { collections } = await fetchCollections();

    expect(collections.totalCount).toBe(20); // Check number of collecitons
    expect(collections.edges[0].node.id).toBe(collections.nodes[0].id); // Check if edges and nodes arrays are ordered the same way
  });
});
