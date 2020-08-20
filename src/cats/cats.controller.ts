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
  UsePipes,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { CreateCatDto, ListAllEntities, UpdateCatDto, createCatSchema } from './dto/cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interface/cat.interface';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { CatByIdPipe } from 'src/common/pipes/cat-by-id.pipe';
import { Roles } from 'src/common/decorators/roles.decorator';
import { IsCached } from 'src/common/decorators/is-cached.decorator';

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
  // 通过Joi验证参数
  @UsePipes(new JoiValidationPipe(createCatSchema))
  async createCat(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Post('validation')
  @Roles('admin')
  async validationCreate(@Body(/*new ValidationPipe()*/) createCatDto: CreateCatDto): Promise<Cat> {
    return await this.catsService.create(createCatDto);
  }

  @Post('validation2')
  // @UsePipes(new ValidationPipe())
  async validationCreate2(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return await this.catsService.create(createCatDto);
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
    return this.catsService.findAll(query.limit);
  }

  @Get(':id')
  @IsCached(false)
  async findOne(@Param('id', ParseIntPipe, CatByIdPipe) cat: Cat): Promise<Cat> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cat);
      }, 500);
    });
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCatDto: UpdateCatDto): Promise<Cat> {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `This action removes a #${id} cat`;
  }
}
