import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, LoginDto } from './userDto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) { }

  /**
  * 获取用户
  */
  async getUserList() {
    const userList = await this.usersRepository.find();
    return userList;
  }

  /**
  * 创建用户
  */
  async createUser(dto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = dto.name;
    user.account = dto.account;
    user.password = dto.password;
    user.date = new Date().getTime().toString();
    delete user.id; // 避免创建时用户传了id
    const result = await this.usersRepository.save(user)
    return result;
  }

  /**
   * 用户登录
   */
  async login(loginDto: LoginDto): Promise<any> {
    const user = new User();
    user.account = loginDto.account;
    user.password = loginDto.password;
    const result = await this.usersRepository.find(user)
    return result;
  }
}
