import { Router } from 'express';

import { uploadFiles } from '../controllers';
import { userDataAuth } from '../middlewares';
import { upload } from '../utils';

export const servicesRouter = Router();

servicesRouter.post('/upload', userDataAuth, upload.array('file'), uploadFiles);
