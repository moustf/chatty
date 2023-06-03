import { Router } from 'express';

import {
  getUserByIdController,
  searchForUsers,
  checkUserPassword,
  changeUserPassword,
  getUserConversations,
} from '../controllers';
import { userDataAuth } from '../middlewares';

export const userRouter = Router();

userRouter.get('/', userDataAuth, getUserByIdController);
userRouter.get('/find', userDataAuth, searchForUsers);
userRouter.get('/password', userDataAuth, checkUserPassword);
userRouter.put('/password', userDataAuth, changeUserPassword);
userRouter.get('/conversations', userDataAuth, getUserConversations);
