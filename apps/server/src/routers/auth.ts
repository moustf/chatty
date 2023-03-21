import { Router } from 'express';

import { signupController, providerAuth } from '../controllers';

export const authRouter = Router();

authRouter.post('/signup', signupController);
authRouter.post('/providers', providerAuth);
