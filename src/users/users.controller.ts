import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSchemaArray } from './dto/user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('createUsers')
  async createUsers(@Body() users: UserSchemaArray): Promise<unknown> {
    // 必须要要经过new User(user)实例化，否则会报错
    return await this.usersService.createMany(users.users.map((user) => new User(user)));
  }

  @Get('users')
  async getUsers(): Promise<unknown> {
    return await this.usersService.findAll();
  }
}
