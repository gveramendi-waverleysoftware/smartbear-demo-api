import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() registerAuthDto: RegisterAuthDto) {
    this.authService.register(registerAuthDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'User registered successfully',
    };
  }

  @Post('/login')
  async login(@Body() registerAuthDto: RegisterAuthDto) {
    const accessToken = await this.authService.login(registerAuthDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'User login successfully',
      accessToken,
    };
  }
}
