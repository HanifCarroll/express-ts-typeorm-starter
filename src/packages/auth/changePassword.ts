import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { User } from '../../typeorm/entity/user';

export const changePassword = async (req: Request, res: Response) => {
  //Get ID from JWT
  const id = res.locals.jwtPayload.userId;

  //Get parameters from the body
  const { oldPassword, newPassword } = req.body;
  if (!(oldPassword && newPassword)) {
    res.status(400).send();
  }

  //Get user from the database
  const userRepository = getRepository(User);
  let user: User;
  try {
    user = await userRepository.findOneOrFail(id);
  } catch (id) {
    res.status(401).send();
  }

  //Check if old password matches
  if (!user.checkPassword(oldPassword)) {
    res.status(401).send();
    return;
  }

  //Validate the model (password length)
  user.password = newPassword;
  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }
  //Hash the new password and save
  user.hashPassword();
  userRepository.save(user);

  res.status(204).send();
};
