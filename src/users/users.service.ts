import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const createdUser = await this.usersRepository.save(createUserDto);
    return createdUser;
  }

  async findAllUsers(): Promise<Users[]> {
    const users = await this.usersRepository.find();

    if (users.length === 0) throw new HttpException('Users not found!', HttpStatus.NOT_FOUND);

    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
