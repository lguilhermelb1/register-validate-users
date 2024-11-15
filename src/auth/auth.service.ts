import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) { }

  async login(authDto: AuthDto): Promise<{ access_token: string }> {
    const user: User | undefined = await this.userService.findUserByEmail(authDto.email).catch(() => undefined);

    if (!user) throw new NotFoundException(`Email or password invalid!`);

    const isMatch = await bcrypt.compare(authDto.password, user.password);

    if (!isMatch) throw new NotFoundException(`Email or password invalid!`);

    const payload = { sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
