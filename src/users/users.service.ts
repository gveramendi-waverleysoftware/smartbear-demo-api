import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = User.create(createUserDto);
    await user.save();

    delete user.password;
    return user;
  }

  async getAll(): Promise<User[]> {
    const users = await User.find();

    return users;
  }

  async getById(id: number): Promise<User> {
    const user = await User.findOne(id);

    delete user.password;
    return user;
  }

  async getByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getById(id);
    await User.update({ id: user.id }, updateUserDto);

    return await this.getById(id);
  }

  async delete(id: number): Promise<void> {
    const user = await this.getById(id);
    User.delete({ id: user.id });
  }
}
