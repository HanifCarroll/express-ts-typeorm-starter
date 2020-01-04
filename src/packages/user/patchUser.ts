import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { UserService } from './userService';
import { User } from '../../typeorm/entity/user';

export const patchUser = async (req: Request, res: Response): Promise<void> => {
  const userService = new UserService();
  const id = Number(req.params.id);
  const { username, role } = req.body;
  let user: User;

  try {
    user = await userService.findById(id);
  } catch (error) {
    res.status(404).send('User not found');
    return;
  }

  user.username = username;
  user.role = role;
  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  try {
    await userService.save(user);
  } catch (e) {
    res.status(409).send('Username already in use');
    return;
  }
  res.status(204).send();
};
