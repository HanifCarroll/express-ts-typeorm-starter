import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../typeorm/entity/user';
import { UserService } from '../../core/service/userService';

export const deleteUser = async (req: Request, res: Response) => {
  const userService = new UserService();
  const id = req.params.id;
  let user: User;

  try {
    user = await userService.findById(id);
  } catch (error) {
    res.status(404).send("User not found");
    return;
  }
  userService.delete(user);

  //After all send a 204 (no content, but accepted) response
  res.status(204).send();
};