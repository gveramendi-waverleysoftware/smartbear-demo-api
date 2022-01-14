import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto): Promise<void> {
    const user = await this.authRepository.findOne({
      email: registerAuthDto.email,
    });
    if (user) {
      throw new BadRequestException(
        `User with email ${user.email} already exists.`,
      );
    }

    return this.authRepository.registerUser(registerAuthDto);
  }

  async login(registerAuthDto: RegisterAuthDto): Promise<string> {
    const { email, password } = registerAuthDto;
    const user = await this.authRepository.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      const payload: JwtPayload = { email };
      const accessToken = await this.jwtService.sign(payload);

      return accessToken;
    }

    throw new UnauthorizedException('Please check your login credentials.');
  }
}
