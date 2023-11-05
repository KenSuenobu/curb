import {Injectable, Logger} from '@nestjs/common';
import {DaoUtils} from 'curb-db/dist/dao/dao-utils.dao';
import {SignupDao, SignupDto} from 'curb-db/dist';

@Injectable()
export class SignupService {
  private readonly logger = new Logger('address.service');

  async createSignup(payload: SignupDto): Promise<boolean> {
    const dao = new SignupDao(DaoUtils.getDatabase());
    return dao.create(payload)
      .then((x) => true)
      .catch((x) => {
        this.logger.error(`Unable to add signup: ${x}`, x);
        return false;
      });
  }

}