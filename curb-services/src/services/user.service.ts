import {Injectable, Logger} from '@nestjs/common';
import {DaoUtils} from 'curb-db/dist/dao/dao-utils.dao';
import {UserDao, UserDto} from 'curb-db/dist';
import {PasswordPayload} from '../controllers/user.controller';
import {encrypt, verify} from 'unixcrypt';

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

  async changePayload(payload: PasswordPayload): Promise<boolean> {
    const dao = new UserDao(DaoUtils.getDatabase());
    const user = await dao.getById(payload.id);

    if (!user) {
      throw new Error('User not found');
    }

    const base64DecodedOldPassword = Buffer.from(payload.oldPassword, 'base64').toString();
    const base64DecodedNewPassword = Buffer.from(payload.newPassword, 'base64').toString();
    const encryptedNewPassword = encrypt(base64DecodedNewPassword);

    // Password matches through verification, allow change of password after encryption
    if (verify(base64DecodedOldPassword, user.password)) {
      return await dao.changePassword(payload.id, encryptedNewPassword);
    }

    // Password does not match.
    return false;
  }

}