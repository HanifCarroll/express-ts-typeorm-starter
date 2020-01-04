import { Router } from 'express';
import { authRouter } from './packages/auth';
import { userRouter } from './packages/user';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/user', userRouter);

export { routes };
