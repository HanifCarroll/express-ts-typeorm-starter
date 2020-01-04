import { Repository, getRepository, DeleteResult } from 'typeorm';
import { User } from '../../typeorm/entity';

export class UserService {
  constructor(private userRepository: Repository<User> = getRepository(User)) {}

  public async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      select: ['id', 'username', 'role'],
    });

    return users;
  }

  public async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      where: { id },
      select: ['id', 'username', 'role'],
    });

    return user;
  }

  public async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      where: { username },
      select: ['id', 'username', 'password', 'role'],
    });

    return user;
  }

  public async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  public async delete(user: User): Promise<DeleteResult> {
    return await this.userRepository.delete(user);
  }
}
