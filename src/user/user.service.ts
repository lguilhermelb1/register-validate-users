import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const hashPassword = await bcrypt.hash(createUserDto.password, 10)

    const createdUser = await this.userRepository.save({ ...createUserDto, password: hashPassword });
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

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    var password = updateUserDto.password;
    if (password == null || password == '') {
      const currentPassword = (await this.findUserById(id)).password;
      password = currentPassword;
    }
    const hashPassword = await bcrypt.hash(password, 10)

    const updatedUser = await this.userRepository.update(id, { ...updateUserDto, password: hashPassword, updatedAt: new Date(Date.now()) });
    return updatedUser;
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id);
    return `User with UUID: ${id} deleted`;
  }
}
