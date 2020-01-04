import { Request, Response } from 'express';
import { UserService } from './userService';

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const userService = new UserService();
  const id = Number(req.params.id);

  try {
    const user = await userService.findById(id);
    res.json(user);
  } catch (error) {
    console.log('error', error);
    res.status(404).send('User not found');
  }
};
