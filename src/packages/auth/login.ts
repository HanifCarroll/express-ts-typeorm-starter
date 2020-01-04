import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../../config/config';
import { User } from '../../typeorm/entity/user';
import { UserService } from '../user/userService';

export const login = async (req: Request, res: Response) => {
  const userService = new UserService();
  const { username, password } = req.body;

  if (!(username && password)) {
    res.status(400).send();
  }

  let user: User;
  try {
    user = await userService.findByUsername(username);
  } catch (error) {
    res.status(401).send();
  }

  //Check if encrypted password match
  if (!user.checkPassword(password)) {
    res.status(401).send();
    return;
  }

  //Sing JWT, valid for 1 hour
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    config.jwtSecret,
    { expiresIn: '1h' }
  );

  //Send the jwt in the response
  res.send(token);
};
