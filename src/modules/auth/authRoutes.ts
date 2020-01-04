import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import { login } from './login';
import { changePassword } from './changePassword';

const router = Router();
//Login route
router.post(
  '/login',
  login
);

//Change my password
router.post(
  '/change-password',
  [checkJwt],
  changePassword
);

export default router;
