import { Request, Response, NextFunction } from 'express';
import { User } from '../typeorm/entity/user';
import { UserService } from '../packages/user/userService';

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;
    const userService = new UserService();

    let user: User;
    try {
      user = await userService.findById(id);
    } catch (err) {
      console.log('err', err);
      res.status(401).send();
    }

    //Check if array of authorized roles includes the user's role
    if (roles.indexOf(user.role) > -1) next();
    else res.status(401).send();
  };
};
