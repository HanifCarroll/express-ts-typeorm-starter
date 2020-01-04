import { Router } from 'express';
import { checkJwt } from '../../middlewares/checkJwt';
import { login } from './login';
import { changePassword } from './changePassword';

const router = Router();
router.post('/login', login);

router.post('/change-password', [checkJwt], changePassword);

export default router;
