// import { Request } from 'express';
// import multer from 'multer';
// import multerS3 from 'multer-s3';

// import { StatusCodes } from '@chatty/types';

// import { GenericError } from '../utils/custom/GenericError';
// import { mediaMimeTypes } from '../utils/helpers';

// const { s3Client } = require('../../bucket');

// export const upload = multer({
//   storage: multerS3({
//     s3: s3Client,
//     bucket: 'chatty',
//     metadata: function (req: Request, file: Express.Multer.File, cb: any) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req: Request, file: Express.Multer.File, cb: any) {
//       cb(null, 'uploads/' + file.originalname);
//     },
//   }),
//   fileFilter: function (req: Request, file: Express.Multer.File, cb: any) {
//     const mimeTypes = Object.values(mediaMimeTypes);

//     if (!mimeTypes.includes(file.mimetype)) {
//       cb(
//         new GenericError(
//           StatusCodes.WrongData,
//           'The file type you are trying to upload is not allowed!'
//         ),
//         false
//       );
//     } else {
//       cb(null, true);
//     }
//   },
//   limits: {
//     fieldSize: 10 * 1024 * 1024, // ! 10 MB,
//   },
// });
