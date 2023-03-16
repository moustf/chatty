import { Router } from 'express';

import { signupController } from '../controllers';

export const authRouter = Router();

authRouter.post('/signup', signupController);
