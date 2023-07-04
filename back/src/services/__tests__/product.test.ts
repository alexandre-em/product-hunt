import { fetchProductByDate } from '../product';

// Test based on the result of query runned on https://ph-graph-api-explorer.herokuapp.com/ platform
describe('PH fetching products by date', () => {
  it('should return all products featured the 2021/07/27', async () => {
    const after = new Date(2021, 6, 27, 0, 0, 0).toISOString();
    const before = new Date(2021, 6, 27, 23, 59, 59).toISOString();

    const { posts } = await fetchProductByDate(after, before);
    const instance1 = posts.edges[0];
    const instance2 = posts.edges[19];

    expect(posts.totalCount).toBe(20); // Check total product for the specified Date
    expect(instance1.node.name).toBe('SPARQ'); // Check if the list of product is ordered
    expect(instance2.node.featuredAt).not.toBeNull(); // Check if the product is featured

    // Checking if the date match
    const date = new Date(2021, 6, 27);

    const instance1Date = new Date(instance1.node.featuredAt);
    const instance2Date = new Date(instance2.node.featuredAt);

    expect(instance1Date.getDate()).toBe(date.getDate());
    expect(instance2Date.getDate()).toBe(date.getDate());

    expect(instance1Date.getMonth()).toBe(date.getMonth());
    expect(instance2Date.getMonth()).toBe(date.getMonth());

    expect(instance1Date.getFullYear()).toBe(date.getFullYear());
    expect(instance2Date.getFullYear()).toBe(date.getFullYear());
  });
});
