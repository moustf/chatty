import { Router } from 'express';

import { signupController, providerAuth, authController } from '../controllers';
import { userDataAuth } from '../middlewares/userAuth';

export const authRouter = Router();

authRouter.post('/signup', signupController);
authRouter.post('/providers', providerAuth);
authRouter.post('/', userDataAuth, authController);
