import {Injectable, Logger} from '@nestjs/common';
import {DaoUtils} from 'curb-db/dist/dao/dao-utils.dao';
import {UserDao, UserDto} from 'curb-db/dist';

@Injectable()
export class UserService {
  private readonly logger = new Logger('user.service');

  async login(username: string, password: string): Promise<string> {
    const dao = new UserDao(DaoUtils.getDatabase());
    return dao.login(username, password);
  }

  async getUserInfo(jwt: string): Promise<UserDto> {
    const dao = new UserDao(DaoUtils.getDatabase());
    return dao.getUserInfo(jwt);
  }

}