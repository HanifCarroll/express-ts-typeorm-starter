import { Router } from 'express';
import authRoutes from './modules/auth/authRoutes';
import userRoutes from './modules/user/userRoutes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);
routes.use('/', (req, res) => res.json({ success: 'hooray!' }));

export default routes;
