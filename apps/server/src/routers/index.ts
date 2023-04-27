import { Router } from 'express';

import { authRouter } from './auth';
import { conversationRouter } from './conversation';
import { userRouter } from './user';

export const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/conversations', conversationRouter);
