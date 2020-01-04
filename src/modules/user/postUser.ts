import { Request, Response } from 'express';
import { User } from '../../typeorm/entity/user';
import { validate } from 'class-validator';
import { getRepository } from 'typeorm';

export const postUser = async (req: Request, res: Response) => {
  //Get parameters from the body
  let { username, password, role } = req.body;
  let user = new User();
  user.username = username;
  user.password = password;
  user.role = role;

  //Validade if the parameters are ok
  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  //Hash the password, to securely store on DB
  user.hashPassword();

  //Try to save. If fails, the username is already in use
  const userRepository = getRepository(User);
  try {
    await userRepository.save(user);
  } catch (e) {
    res.status(409).send("username already in use");
    return;
  }

  //If all ok, send 201 response
  res.status(201).send("User created");
};
