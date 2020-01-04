import { Router } from 'express';
import { checkJwt, wrapAsync } from '../../middlewares';
import { login } from './login';
import { changePassword } from './changePassword';

const authRouter = Router();

authRouter.post('/login', wrapAsync(login));

authRouter.post('/change-password', [checkJwt], wrapAsync(changePassword));

export { authRouter };
