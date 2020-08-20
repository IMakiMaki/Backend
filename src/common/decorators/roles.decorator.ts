import { SetMetadata, CustomDecorator } from '@nestjs/common';

export const Roles: (...args: string[]) => CustomDecorator<string> = (...roles: string[]) =>
  SetMetadata('roles', roles);
