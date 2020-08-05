import {
  Controller,
  Get,
  Res,
  Req,
  Post,
  Body,
  Query,
  Param,
  Delete,
  Put,
  Ip,
  Header,
  Redirect,
  HttpException,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { CreateCatDto, ListAllEntities, UpdateCatDto, createCatSchema } from './dto/cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interface/cat.interface';
import { JoiValidationPipe } from 'src/common/pipes/joiValidation.pipe';
import { compile, object } from '@hapi/joi';
import Joi = require('@hapi/joi');

// 限制请求主机的HOST
@Controller({ host: 'localhost', path: 'cats' })
// @Controller('cats')
// 异常过滤器
// @UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // 通过注解拿到response响应对象，可以自主控制响应过程
  @Get('res')
  getRes(@Res() response: Response, @Req() request: Request, @Ip() ip: string): Response {
    return response.status(200).send({
      requestHeader: request.headers,
      ip: ip,
      response: response.statusCode,
    });
  }

  // 设置response header
  @Post()
  @Header('access-token', '2121xxxx')
  @UsePipes(new JoiValidationPipe(createCatSchema))
  async createCat(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  // 重定向
  @Redirect()
  @Get('redirect')
  redirectTest(): { url: string; statusCode: number } {
    return {
      url: 'http://www.baidu.com',
      statusCode: 302,
    };
  }

  @Get()
  findAll(@Query() query: ListAllEntities): Promise<Cat[]> {
    // throw new HttpException({ xxxx: 1221, sasa: 'xxxx' }, HttpStatus.FORBIDDEN); //  抛出异常
    return this.catsService.findAll();
  }

  @Get(':id/:oo')
  findOne(@Param('id') id: string, @Param('oo') oo: string): string {
    return `This action returns a #${id} ${oo} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): string {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `This action removes a #${id} cat`;
  }
}
