import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
  ) { }

  async login(authDto: AuthDto): Promise<User> {
    const user: User | undefined = await this.userService.findUserByEmail(authDto.email).catch(() => undefined);

    if (user) throw new NotFoundException(`Email or password invalid!`);

    if (!user) throw new NotFoundException(`Email or password invalid!`);

    return user;
  }
}
