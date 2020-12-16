import { User } from '../entities/user.entity';
import { IsString, IsBoolean, ValidateNested, ArrayNotEmpty, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export type UserInfo = Omit<User, 'password'>;

export type ValidateInfo = Pick<User, 'id' | 'userName'>;

export class UserSchema implements Omit<User, 'id'> {
  @IsString()
  readonly userName: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsBoolean()
  readonly isActive: boolean;

  @IsString()
  readonly password: string;

  @IsArray()
  readonly photos: [];
}

export class UserSchemaArray {
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => UserSchema)
  users: User[];
}
