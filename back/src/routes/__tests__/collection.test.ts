import request from 'supertest';

import app from '../../config/server';

describe('Testing collection route', () => {
  it('Should returns collection', async () => {
    const res = await request(app).get(`/api/collections`);

    expect(res.statusCode).toEqual(200); // Check if the query is accepted by the PH API
    expect(res.body.collections).toBeDefined();
    expect(res.body.collections.totalCount).toBe(20);
  });

  it('Should returns next collection list', async () => {
    const res = await request(app).get(`/api/collections?next=MjA`);

    expect(res.statusCode).toEqual(200); // Check if the query is accepted by the PH API
    expect(res.body.collections.edges[0].cursor).toBe('MjE');
  });
});
