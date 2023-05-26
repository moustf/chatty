import request from 'supertest';

import { app } from '../server';
import { getUserTokenFromLogin } from '../utils/helpers';

describe('Testing the route of creating a presigned url to upload media to spaces bucket', () => {
  it('Test the success case, the route should return 201 status code, the url, and success message', async () => {
    const mustafaToken = await getUserTokenFromLogin(
      'mustafa@gmail.com',
      'Root@123'
    );

    const res = await request(app)
      .get('/api/v1/utils/presigned-url?fileType=image/png&fileName=file.png')
      .set('Cookie', [`token=${mustafaToken}`])
      .expect(201);

    console.log(typeof res.body.data.url, 'Presigned URL data type!!');

    expect(typeof res.body.data.url).toBe('string');
    expect(res.body.data.url.startsWith('https://')).toBe(true);
    expect(res.body.msg).toBeDefined();
  });

  it('Test the success case, the route should return 201 status code, the url, and success message', async () => {
    const mustafaToken = await getUserTokenFromLogin(
      'mustafa@gmail.com',
      'Root@123'
    );

    const res = await request(app)
      .get('/api/v1/utils/presigned-url')
      .set('Cookie', [`token=${mustafaToken}`])
      .expect(400);

    expect(res.body.msg).toBe(
      'Both file type and file name queries should be provided!'
    );
  });
});
