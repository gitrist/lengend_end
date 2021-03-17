import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User as T_User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([T_User])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
