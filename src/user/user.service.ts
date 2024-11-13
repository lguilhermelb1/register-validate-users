import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const createdUser = await this.userRepository.save(createUserDto);
    return createdUser;
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();

    if (users.length === 0) throw new HttpException('Users not found!', HttpStatus.NOT_FOUND);

    return users;
  }

  async findUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id
      }
    });

    if (!user) throw new NotFoundException(`Id: ${id} not found!`);

    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email
      }
    });

    if (!user) throw new NotFoundException(`Email: ${email} not found!`);

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
