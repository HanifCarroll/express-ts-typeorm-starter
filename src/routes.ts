import { Router } from 'express';
import authRoutes from './packages/auth/authRoutes';
import userRoutes from './packages/user/userRoutes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);
routes.use('/', (req, res) => res.json({ success: 'hooray!' }));

export default routes;
