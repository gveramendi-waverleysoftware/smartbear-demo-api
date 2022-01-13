import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { FilterUserDto } from './dto/filter-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      email: createUserDto.email,
    });
    if (user) {
      throw new BadRequestException(
        `User with email ${user.email} already exists.`,
      );
    }

    return this.usersRepository.createUser(createUserDto);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    return user;
  }

  getUsers(filterUserDto: FilterUserDto): Promise<User[]> {
    return this.usersRepository.getUsers(filterUserDto);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);

    return this.usersRepository.updateUser(user, updateUserDto);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.getUserById(id);

    await this.usersRepository.remove(user);
  }
}
