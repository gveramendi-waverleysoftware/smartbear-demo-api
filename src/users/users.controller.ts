import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
      user,
    };
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();

    return {
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      users,
    };
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.getUserById(+id);

    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      user,
    };
  }

  @Get()
  async getCustomer(@Query() filterUserDto: FilterUserDto) {
    const users = await this.usersService.getUsers(filterUserDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      users,
    };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.updateUser(id, updateUserDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
      user,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.usersService.deleteUser(+id);

    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'User deleted successfully',
    };
  }
}
