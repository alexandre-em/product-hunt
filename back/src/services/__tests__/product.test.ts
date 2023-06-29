import { fetchProductByDate } from '../productHuntFetch';

// Test based on the result of query runned on https://ph-graph-api-explorer.herokuapp.com/ platform
describe('PH fetching products', () => {
  it('should return all products featured the 27/07/2021', async () => {
    const after = new Date(2021, 6, 27, 0, 0, 0).toISOString();
    const before = new Date(2021, 6, 27, 23, 59, 59).toISOString();

    const { posts } = await fetchProductByDate(after, before);

    expect(posts.totalCount).toBe(20); // Check total product for the specified Date
    expect(posts.edges[0].cursor).toBe('MQ'); // Check if the list of product is order
    expect(posts.edges[19].cursor).toBe('MjA');
  });
});
