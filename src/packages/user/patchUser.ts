import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { UserService } from './userService';
import { User } from '../../typeorm/entity/user';

export const patchUser = async (req: Request, res: Response) => {
  const userService = new UserService();
  const id = Number(req.params.id);
  const { username, role } = req.body;
  let user: User;

  try {
    user = await userService.findById(id);
  } catch (error) {
    //If not found, send a 404 response
    res.status(404).send("User not found");
    return;
  }

  //Validate the new values on model
  user.username = username;
  user.role = role;
  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  //Try to save, if fails, that means username already in use
  try {
    await userService.save(user);
  } catch (e) {
    res.status(409).send("username already in use");
    return;
  }
  //After all send a 204 (no content, but accepted) response
  res.status(204).send();
};
