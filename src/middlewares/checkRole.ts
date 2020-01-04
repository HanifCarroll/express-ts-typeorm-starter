import { Request, Response, NextFunction } from 'express';
import { User } from '../typeorm/entity/user';
import { UserService } from '../packages/user/userService';
import { get } from 'lodash';

export const checkRole = (roles: Array<string>): Function => {
  return async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    //Get the user ID from previous midleware
    const id = get(res, 'locals.jwtPayload.userId', null);

    if (id) {
      const userService = new UserService();
      userService
        .findById(id)
        .then((user: User): void => {
          if (roles.indexOf(user.role) > -1) next();
        })
        .catch((err: Error): void => {
          console.log('err', err);
          res.status(401).send();
        });
    } else {
      res.status(401).send();
    }
  };
};
