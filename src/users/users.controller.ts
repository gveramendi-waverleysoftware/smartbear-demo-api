import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  private logger = new Logger('UsersController');

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
  async getAllUsers(@GetUser() user: User) {
    const users = await this.usersService.getAllUsers();
    this.logger.log(`User ${user.email} retrieving all tasks.`);

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
