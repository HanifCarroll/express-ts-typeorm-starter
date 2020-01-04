import { Router } from 'express';
import { checkJwt, checkRole } from '../../middlewares';
import { getUsers } from './getUsers';
import { getUser } from './getUser';
import { postUser } from './postUser';
import { patchUser } from './patchUser';
import { deleteUser } from './deleteUser';

const router = Router()

//Get all users
router.get(
  '/',
  [checkJwt, checkRole(['ADMIN'])],
  getUsers
);

// Get one user
router.get(
  '/:id([0-9]+)',
  [checkJwt, checkRole(['ADMIN'])],
  getUser
);

//Create a new user
router.post(
  '/',
  postUser
);

//Edit one user
router.patch(
  '/:id([0-9]+)',
  [checkJwt, checkRole(['ADMIN'])],
  patchUser
);

//Delete one user
router.delete(
  '/:id([0-9]+)',
  [checkJwt, checkRole(['ADMIN'])],
  deleteUser
);

export default router;
