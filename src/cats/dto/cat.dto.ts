import Joi = require('@hapi/joi');

export class CreateCatDto {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}

export const createCatSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  breed: Joi.string().required(),
});

export class ListAllEntities {
  readonly limit: number;
}

export class UpdateCatDto {}
