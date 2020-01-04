import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../typeorm/entity/user';

export const getUser = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id: number = Number(req.params.id);

  //Get the user from database
  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOneOrFail(id, {
      select: ["id", "username", "role"] //We dont want to send the password on response
    });
    res.json(user);
  } catch (error) {
    console.log('error', error);
    res.status(404).send("User not found");
  }
};