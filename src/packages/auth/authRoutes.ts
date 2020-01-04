import { Router } from 'express';
import { checkJwt } from '../../middlewares/checkJwt';
import { login } from './login';
import { changePassword } from './changePassword';

const authRouter = Router();

authRouter.post('/login', login);

authRouter.post('/change-password', [checkJwt], changePassword);

export { authRouter };
