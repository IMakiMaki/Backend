import { Controller, UseGuards, Post, Request, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserInfo } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  // 登录验证
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: UserInfo }): Promise<any> {
    return this.authService.login(req.user);
  }

  // 权限验证
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: { user: any }): Promise<UserInfo | undefined> {
    return this.userService.findOne(req.user.userName);
  }
}
