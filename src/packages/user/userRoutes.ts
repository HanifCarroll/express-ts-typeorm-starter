import { Router } from 'express';
import { checkJwt, checkRole, wrapAsync } from '../../middlewares';
import { getUsers } from './getUsers';
import { getUser } from './getUser';
import { postUser } from './postUser';
import { patchUser } from './patchUser';
import { deleteUser } from './deleteUser';

const userRouter = Router();

userRouter.get('/', [checkJwt, checkRole(['ADMIN'])], wrapAsync(getUsers));

userRouter.get('/:id([0-9]+)', [checkJwt, checkRole(['ADMIN'])], wrapAsync(getUser));

userRouter.post('/', wrapAsync(postUser));

userRouter.patch('/:id([0-9]+)', [checkJwt, checkRole(['ADMIN'])], wrapAsync(patchUser));

userRouter.delete('/:id([0-9]+)', [checkJwt, checkRole(['ADMIN'])], wrapAsync(deleteUser));

export { userRouter };
