import {Injectable, Logger} from '@nestjs/common';
import {TollDao, TollDto} from 'curb-db/dist';
import {DaoUtils} from 'curb-db/dist/dao/dao-utils.dao';

@Injectable()
export class TollService {
  private readonly logger = new Logger('toll.service');

  async create(payload: TollDto): Promise<boolean> {
    const dao = new TollDao(DaoUtils.getDatabase());
    return dao.create(payload)
      .then((x) => true)
      .catch((x) => {
        this.logger.error(`Unable to create guest: ${x}`, x);
        return false;
      });
  }

  async edit(payload: TollDto): Promise<boolean> {
    const dao = new TollDao(DaoUtils.getDatabase());
    return dao.edit(payload.id, payload);
  }

  async list(): Promise<TollDto[]> {
    const dao = new TollDao(DaoUtils.getDatabase());
    return dao.list();
  }

}