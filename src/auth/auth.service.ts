import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserInfo } from 'src/users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { SignNature } from './interfaces/sign-nature.interface';
import { LoginInfo } from 'src/auth/dto/login-info.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(loginInfo: LoginInfo): Promise<UserInfo | null> {
    const user = await this.usersService.findOne(loginInfo.username);
    if (user?.password === loginInfo.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserInfo): Promise<{ access_token: string }> {
    const payload: SignNature = { username: user.userName, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
