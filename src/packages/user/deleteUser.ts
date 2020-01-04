import { Request, Response } from 'express';
import { User } from '../../typeorm/entity/user';
import { UserService } from './userService';

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const userService = new UserService();
  const id = Number(req.params.id);
  let user: User;

  try {
    user = await userService.findById(id);
  } catch (error) {
    res.status(404).send('User not found');
    return;
  }
  userService.delete(user);

  res.status(204).send();
};
