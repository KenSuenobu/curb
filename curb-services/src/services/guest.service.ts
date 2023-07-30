import {Injectable, Logger} from '@nestjs/common';
import {GuestDao, GuestDto} from 'curb-db/dist';
import {DaoUtils} from 'curb-db/dist/dao/dao-utils.dao';

@Injectable()
export class GuestService {
  private readonly logger = new Logger('guest.service');

  async saveGuest(payload: GuestDto): Promise<boolean> {
    const dao = new GuestDao(DaoUtils.getDatabase());
    return dao.edit(payload.id, payload)
      .then((x) => true)
      .catch((x) => {
        this.logger.error(`Unable to edit guest: ${x}`, x);
        return false;
      });
  }

  async createGuest(payload: GuestDto): Promise<boolean> {
    const dao = new GuestDao(DaoUtils.getDatabase());
    return dao.create(payload)
      .then((x) => true)
      .catch((x) => {
        this.logger.error(`Unable to create guest: ${x}`, x);
        return false;
      });
  }

  async listAllGuests(): Promise<GuestDto[]> {
    const dao = new GuestDao(DaoUtils.getDatabase());
    return dao.listAll();
  }

  async listGuests(blacklisted: boolean): Promise<GuestDto[]> {
    const dao = new GuestDao(DaoUtils.getDatabase());
    return dao.list(blacklisted);
  }

  async getGuest(id: number): Promise<GuestDto> {
    const dao = new GuestDao(DaoUtils.getDatabase());
    return dao.getById(id);
  }

}