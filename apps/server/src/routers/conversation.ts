import { Router } from 'express';

import { getConversation, getAllMessages } from '../controllers';
import { userDataAuth } from '../middlewares';

export const conversationRouter = Router();

conversationRouter.get('/', userDataAuth, getConversation);
conversationRouter.get('/messages', userDataAuth, getAllMessages);
