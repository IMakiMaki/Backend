import { SetMetadata, CustomDecorator } from '@nestjs/common';

export const IsCached: (isCached: boolean) => CustomDecorator<string> = (isCached: boolean) =>
  SetMetadata('isCached', isCached);
