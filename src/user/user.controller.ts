import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Res() response: Response, @Body() createUserDto: CreateUserDto) {
    const userCreated = await this.userService.createUser(createUserDto);
    return response.status(201).json(userCreated);
  }

  @Get()
  async findAllUsers(@Res() response: Response) {
    const users = await this.userService.findAllUsers();
    return response.status(200).json(users);
  }

  @Get(':id')
  findUserByEmail(@Param('id') email: string) {
    return this.userService.findUserByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
