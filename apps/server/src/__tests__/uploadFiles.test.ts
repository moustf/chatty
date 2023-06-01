/* eslint-disable @typescript-eslint/no-unused-vars */
import { join } from 'path';

import { Request, Response, NextFunction } from 'express';
import request from 'supertest';

import { app } from '../server';
import { getUserTokenFromLogin, uploadMany, upload } from '../utils';

jest.mock('../utils/helpers/bucketUpload');
// jest.mock('../utils/multer/saveFilesConfigs');

// (upload as unknown as jest.Mock).mockResolvedValue(
//   (req: any, res: any, next: any) => {
//     req.body = { text: '' };
//     req.files = [
//       {
//         fieldname: 'file',
//         originalname: 'image1.jpg',
//         buffer: Buffer.from('whatever'),
//       },
//       {
//         fieldname: 'file',
//         originalname: 'image2.jpg',
//         buffer: Buffer.from('whatever'),
//       },
//     ];
//     return next();
//   }
// );

// const mockArrayMethod = jest.fn((req, _res, next) => {
//   req.body = { text: '' };
// req.files = [
//   {
//     fieldname: 'file',
//     originalname: 'image1.jpg',
//     buffer: Buffer.from('whatever'),
//   },
//   {
//     fieldname: 'file',
//     originalname: 'image2.jpg',
//     buffer: Buffer.from('whatever'),
//   },
// ];
// return next();
// });

// const mockUploadMiddleware = {
//   array: mockArrayMethod,
// };

// (upload as unknown as jest.Mock).mockReturnValue(mockUploadMiddleware);

// (upload as unknown as jest.Mock).mockImplementation(() => {
//   return {
//     array: (req: Request, res: Response, next: NextFunction) => {
//       req.body = { text: '' };
//       req.files = [
//         {
//           fieldname: 'file',
//           originalname: 'image1.jpg',
//           buffer: Buffer.from('whatever'),
//         },
//         {
//           fieldname: 'file',
//           originalname: 'image2.jpg',
//           buffer: Buffer.from('whatever'),
//         },
//       ] as any;
//       return next();
//     },
//   };
// });

describe('Testing the route that uploads the files to the bucket and returns their URIs', () => {
  it('Should return 200 status codes and the bucket images URIs', async () => {
    (uploadMany as jest.MockedFunction<typeof uploadMany>).mockImplementation(
      (_files, _result) => {
        return Promise.resolve([
          'https://chatty-bucket.fra1.digitaloceanspaces.com/uploads/image1.jpg',
          'https://chatty-bucket.fra1.digitaloceanspaces.com/uploads/image2.jpg',
        ]);
      }
    );

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

  // it('Should return 401 status codes and the unauthenticated message', async () => {
  //   (uploadMany as jest.MockedFunction<typeof uploadMany>).mockImplementation(
  //     (_files, _result) => {
  //       return Promise.resolve([
  //         'https://chatty-bucket.fra1.digitaloceanspaces.com/uploads/image1.jpg',
  //         'https://chatty-bucket.fra1.digitaloceanspaces.com/uploads/image2.jpg',
  //       ]);
  //     }
  //   );

  //   const res = await request(app)
  //     .post('/api/v1/services/upload')
  //     .set('Cookie', [])
  //     .attach(
  //       'file',
  //       join(__dirname, '.', 'testImages', 'product1.jpg'),
  //       'image1.jpg'
  //     )
  //     .attach(
  //       'file',
  //       join(__dirname, '.', 'testImages', 'product2.jpg'),
  //       'image2.jpg'
  //     )
  //     .expect(401);

  //   expect(res.body.msg).toBe('Unauthenticated!');
  // });

  it('Should return 400 status codes and the wrong data error message', async () => {
    (uploadMany as jest.MockedFunction<typeof uploadMany>).mockImplementation(
      (_files, _result) => {
        return Promise.resolve([
          'https://chatty-bucket.fra1.digitaloceanspaces.com/uploads/image1.jpg',
          'https://chatty-bucket.fra1.digitaloceanspaces.com/uploads/image2.jpg',
        ]);
      }
    );

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
