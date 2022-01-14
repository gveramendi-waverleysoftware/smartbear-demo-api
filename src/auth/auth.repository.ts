import { User } from 'src/users/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async registerUser(registerAuthDto: RegisterAuthDto): Promise<void> {
    const { email, password } = registerAuthDto;
    const registerUser = this.create({
      email,
      password,
    });

    await this.save(registerUser);
  }
}
