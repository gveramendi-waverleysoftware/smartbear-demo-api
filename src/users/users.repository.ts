import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { firstName, lastName, email, password } = createUserDto;
    const newUser = this.create({
      firstName,
      lastName,
      email,
      password,
    });

    await this.save(newUser);
    return newUser;
  }

  async getUsers(filterUserDto: FilterUserDto): Promise<User[]> {
    const { search } = filterUserDto;
    const query = this.createQueryBuilder('user');

    if (search) {
      query.andWhere(
        `LOWER(user.firstName) LIKE LOWER(:search) OR 
         LOWER(user.lastName) LIKE LOWER(:search) OR 
         LOWER(user.email) LIKE LOWER(:search)`,
        { search: `%${search}%` },
      );
    }

    const users = await query.getMany();
    return users;
  }

  async updateUser(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    const { firstName, lastName } = updateUserDto;

    user.firstName = firstName;
    user.lastName = lastName;

    await this.save(user);
    return user;
  }
}
