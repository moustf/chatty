import { Router } from 'express';

import { userDataAuth, getSignedUrl } from '../middlewares';

export const utilsRouter = Router();

utilsRouter.get('/presigned-url', userDataAuth, getSignedUrl);
