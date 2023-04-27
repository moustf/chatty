import { Router } from 'express';

import { getConversation } from '../controllers';
import { userDataAuth } from '../middlewares/userAuth';

export const conversationRouter = Router();

conversationRouter.get('/', userDataAuth, getConversation);
