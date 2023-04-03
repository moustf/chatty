import { Router } from 'express';

import {
  getUserByIdController,
  searchForUsers,
  checkUserPassword,
  changeUserPassword,
} from '../controllers';
import { userDataAuth } from '../middlewares/userAuth';

export const userRouter = Router();

userRouter.get('/', userDataAuth, getUserByIdController);
userRouter.get('/find', userDataAuth, searchForUsers);
userRouter.get('/password', userDataAuth, checkUserPassword);
userRouter.put('/password', userDataAuth, changeUserPassword);
