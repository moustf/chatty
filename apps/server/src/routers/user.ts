import { Router } from 'express';

import { getUserByIdController, searchForUsers } from '../controllers/user';
import { userDataAuth } from '../middlewares/userAuth';

export const userRouter = Router();

userRouter.get('/', userDataAuth, getUserByIdController);
userRouter.get('/find', userDataAuth, searchForUsers);
