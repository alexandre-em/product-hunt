import request from 'supertest';

import app from '../../config/server';

describe('Testing product route', () => {
  it('Should returns the featured product on a specific date', async () => {
    const after = new Date(2021, 6, 27, 0, 0, 0).toISOString();
    const before = new Date(2021, 6, 27, 23, 59, 59).toISOString();

    const res = await request(app).get(`/api/products/date?after=${after}&before=${before}`);

    expect(res.statusCode).toEqual(200); // Check if the query is accepted by the PH API
  });

  it('Should fail when incorrect values are given', async () => {
    const after = 'aa';
    const before = 'bb';

    const res = await request(app).get(`/api/products/date?after=${after}&before=${before}`);

    expect(res.body.posts).toBeUndefined(); // Check if the request returns products or errors
    expect(res.body.length).toEqual(2); // Check if it detects that there is two errors on the request

    // Check if the errors are related to `after` and `before` variables
    expect(res.body[0].message).toBe('Variable $after of type DateTime was provided invalid value');
    expect(res.body[1].message).toBe('Variable $before of type DateTime was provided invalid value');
  });
});
