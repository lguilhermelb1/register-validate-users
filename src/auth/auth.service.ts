import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
  ) { }

  async login(authDto: AuthDto): Promise<User> {
    const user: User | undefined = await this.userService.findUserByEmail(authDto.email).catch(() => undefined);

    const isMatch = await bcrypt.compare(authDto.password, user.password);

    if (!isMatch) throw new NotFoundException(`Email or password invalid!`);

    if (!user) throw new NotFoundException(`Email or password invalid!`);

    return user;
  }
}
