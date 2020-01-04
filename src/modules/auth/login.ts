import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import config from '../../config/config';
import { User } from '../../typeorm/entity/user';

export const login = async (req: Request, res: Response) => {
  //Check if username and password are set
  let { username, password } = req.body;
  if (!(username && password)) {
    res.status(400).send();
  }

  //Get user from database
  const userRepository = getRepository(User);
  let user: User;
  try {
    user = await userRepository.findOneOrFail({ where: { username } });
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
