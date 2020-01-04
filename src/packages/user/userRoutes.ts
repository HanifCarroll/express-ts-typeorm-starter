import { Router } from 'express';
import { checkJwt, checkRole } from '../../middlewares';
import { getUsers } from './getUsers';
import { getUser } from './getUser';
import { postUser } from './postUser';
import { patchUser } from './patchUser';
import { deleteUser } from './deleteUser';

const userRouter = Router();

userRouter.get('/', [checkJwt, checkRole(['ADMIN'])], getUsers);

userRouter.get('/:id([0-9]+)', [checkJwt, checkRole(['ADMIN'])], getUser);

userRouter.post('/', postUser);

userRouter.patch('/:id([0-9]+)', [checkJwt, checkRole(['ADMIN'])], patchUser);

userRouter.delete('/:id([0-9]+)', [checkJwt, checkRole(['ADMIN'])], deleteUser);

export { userRouter };
