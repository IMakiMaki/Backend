import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, Connection } from 'typeorm';
import { UserInfo } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private connection: Connection
  ) {}

  async createMany(users: User[]): Promise<unknown> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      users.forEach(async (user) => {
        await queryRunner.manager.save<User>(user);
      });
      await queryRunner.commitTransaction();
      return { success: true };
    } catch (err) {
      // 如果遇到错误，可以回滚事务
      await queryRunner.rollbackTransaction();
      return err;
    } finally {
      // 手动实例化并部署一个queryRunner
      await queryRunner.release();
    }
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneByMsq(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  findOne(userName: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ userName }, { relations: ['photos'] });
  }
}
