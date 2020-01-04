import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { User } from '../../typeorm/entity/user';
import { UserService } from '../user/userService';

export const changePassword = async (req: Request, res: Response): Promise<void> => {
  const userService = new UserService();
  const id = res.locals.jwtPayload.userId;
  const { oldPassword, newPassword } = req.body;

  if (!(oldPassword && newPassword)) {
    res.status(400).send();
  }

  let user: User;

  try {
    user = await userService.findById(id);
  } catch (err) {
    console.log('err', err);
    res.status(401).send();
  }

  if (!user.checkPassword(oldPassword)) {
    res.status(401).send();
    return;
  }

  user.password = newPassword;
  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  user.hashPassword();
  userService.save(user);

  res.status(204).send();
};
