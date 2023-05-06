import request from 'supertest';

import { app } from '../server';
import { getUserTokenFromLogin } from '../utils/helpers';

describe('Testing the route for getting all the messages for a specific conversation', () => {
  test('In the success case, the 200 success status code, the success message, and the data array.', async () => {
    const mustafaToken = await getUserTokenFromLogin(
      'mustafa@gmail.com',
      'Root@123'
    );

    const res = await request(app)
      .get('/api/v1/conversations/messages?chatId=6411eca56e9d4cac192a49bd')
      .set('Cookie', [`token=${mustafaToken}`])
      .expect(200);

    expect(res.body.msg).toBe('The chat messages did return successfully!');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('In the failure case, the route should return 400 status code and error message when the user forget the chat id', async () => {
    const mustafaToken = await getUserTokenFromLogin(
      'mustafa@gmail.com',
      'Root@123'
    );

    const res = await request(app)
      .get('/api/v1/conversations/messages?chatId=')
      .set('Cookie', [`token=${mustafaToken}`])
      .expect(400);

    expect(res.body.msg).toBe(
      "The user didn't provide a chat id or provided an invalid chat id."
    );
  });

  test('In the failure case, the route should return 204 status code', async () => {
    const mustafaToken = await getUserTokenFromLogin(
      'mustafa@gmail.com',
      'Root@123'
    );

    const res = await request(app)
      .get('/api/v1/conversations/messages?chatId=644a96c1b8e83c77310a4247')
      .set('Cookie', [`token=${mustafaToken}`])
      .expect(204);

    expect(typeof res.body).toBe('object');
  });
});
