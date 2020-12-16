import Joi = require('@hapi/joi');
import { IsString, IsInt, IsNumberString } from 'class-validator';
import { Cat } from '../interfaces/cat.interface';

export class CreateCatDto implements Omit<Cat, 'id'> {
  @IsString()
  readonly name: string;
  @IsInt()
  readonly age: number;
  @IsString()
  readonly breed: string;
}

export const createCatSchema = Joi.object<CreateCatDto>({
  name: Joi.string().required(),
  age: Joi.number().required(),
  breed: Joi.string().required(),
});

export class ListAllEntities {
  @IsNumberString()
  readonly limit: number;
}

export class UpdateCatDto extends CreateCatDto {}
