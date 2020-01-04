import { Request } from 'express';
import { Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from './user';

export const getUsers = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find({
      select: ["id", "username", "role"] //We dont want to send the passwords on response
    });

    //Send the users object
    res.send(users);
};