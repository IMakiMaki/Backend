import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { UserInfo } from 'src/users/interface/user';
import { Strategy } from 'passport-local';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService, private moduleRef: ModuleRef) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(username: string, password: string): Promise<UserInfo> {
    const user = await this.authService.validateUser({ username, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
