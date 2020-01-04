import { Request } from 'express';
import { Response } from 'express';
import { UserService } from './userService';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const userService = new UserService();

  const users = await userService.findAll();

  res.send(users);
};
