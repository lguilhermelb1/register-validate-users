import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UsePipes(ValidationPipe)
  @Post('createUser')
  async create(@Res() response: Response, @Body() createUserDto: CreateUserDto) {
    const userCreated = await this.userService.createUser(createUserDto);
    return response.status(201).json(userCreated);
  }

  @UseGuards(AuthGuard)
  @Get('findAllUsers')
  async findAllUsers(@Res() response: Response) {
    const users = await this.userService.findAllUsers();
    return response.status(200).json(users);
  }

  @UseGuards(AuthGuard)
  @Get('findUserById/:id')
  async findUserById(@Res() response: Response, @Param('id') id: string) {
    const user = await this.userService.findUserById(id);
    return response.status(200).json(user);
  }

  @UseGuards(AuthGuard)
  @Get('findUserByEmail/:email')
  async findUserByEmail(@Res() response: Response, @Param('email') email: string) {
    const user = await this.userService.findUserByEmail(email);
    return response.status(200).json(user);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  @Patch('updateUser/:id')
  async update(@Res() response: Response, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const userUpdated = await this.userService.updateUser(id, updateUserDto);
    return response.status(200).json(userUpdated);
  }

  @UseGuards(AuthGuard)
  @Delete('deleteUser/:id')
  async deleteUser(@Res() response: Response, @Param('id') id: string) {
    const deleteReturn = await this.userService.deleteUser(id);
    return response.status(200).json(deleteReturn);
  }
}
