import { join } from 'path';

import request from 'supertest';

import { app } from '../server';
import { getUserTokenFromLogin } from '../utils';

describe('Testing the route that uploads the files to the bucket and returns their URIs', () => {
  it('Should return 200 status codes and the bucket images URIs', async () => {
    const mustafaToken = await getUserTokenFromLogin(
      'mustafa@gmail.com',
      'Root@123'
    );

    const res = await request(app)
      .post('/api/v1/services/upload')
      .set('Cookie', [`token=${mustafaToken}`])
      .attach(
        'file',
        join(__dirname, '.', 'testImages', 'product1.jpg'),
        'image1.jpg'
      )
      .attach(
        'file',
        join(__dirname, '.', 'testImages', 'product2.jpg'),
        'image2.jpg'
      )
      .expect(200);

    expect(res.body.msg).toBe('Images uploaded successfully!');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('Should return 401 status codes and the unauthenticated message', async () => {
    process.stdout.on('error', function (err) {
      if (err.code == 'EPIPE') {
        process.exit(0);
      }
    });

    const res = await request(app)
      .post('/api/v1/services/upload')
      .set('Cookie', [])
      .attach(
        'file',
        join(__dirname, '.', 'testImages', 'product1.jpg'),
        'image1.jpg'
      )
      .attach(
        'file',
        join(__dirname, '.', 'testImages', 'product2.jpg'),
        'image2.jpg'
      )
      .expect(401);

    console.log(res, 'CI failing test response!!!');

    expect(res.body.msg).toBe('Unauthenticated!');
  });

  it('Should return 400 status codes and the wrong data error message', async () => {
    const mustafaToken = await getUserTokenFromLogin(
      'mustafa@gmail.com',
      'Root@123'
    );

    const res = await request(app)
      .post('/api/v1/services/upload')
      .set('Cookie', [`token=${mustafaToken}`])
      .expect(400);

    expect(res.body.msg).toBe("The user hasn't sent any files!");
  });
});
