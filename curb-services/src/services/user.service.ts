import {Injectable, Logger} from '@nestjs/common';
import {DaoUtils} from 'curb-db/dist/dao/dao-utils.dao';
import {UserDao, UserDto} from 'curb-db/dist';
import {PasswordPayload} from '../controllers/user.controller';

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
    // const dao = new UserDao(DaoUtils.getDatabase());
    // const user = await dao.getById(payload.id);
    //
    // if (!user) {
    //   throw new Error('User not found');
    // }
    //
    // console.log(`Payload: ${JSON.stringify(payload, null, 2)}`);
    // console.log(`User payload: ${JSON.stringify(user, null, 2)}`);
    //
    // // const decodedPassword = Buffer.from(payload.oldPassword, 'base64').toString();
    // const decodedPassword = await bcrypt.hash('admin123', 10);
    //
    // console.log(`Compare: decoded=${decodedPassword} Pass=${user.password}`);
    //
    // await bcrypt.compare('admin123', decodedPassword)
    //   .then((x) => {
    //     if (x) {
    //       console.log(`Change password here`);
    //     } else {
    //       console.log(`Do not change password here`);
    //     }
    //   });
    //
    // // if (compareResult) {
    // //   console.log(`Changing password: decoded=${decodedPassword} userPass=${user.password}`);
    // //   const decodedNewPassword = Buffer.from(payload.newPassword, 'base64').toString();
    // //   return dao.changePassword(payload.id, decodedNewPassword);
    // // }
    // //
    // // console.log('Not changing password');
    return false;
  }

}