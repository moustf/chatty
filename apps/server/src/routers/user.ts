import { Router } from 'express';

import { getUserByIdController } from '../controllers/user';
import { userDataAuth } from '../middlewares/userAuth';

export const userRouter = Router();

userRouter.get('/', userDataAuth, getUserByIdController);
