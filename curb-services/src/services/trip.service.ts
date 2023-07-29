import {Injectable} from '@nestjs/common';
import {DaoUtils} from 'curb-db/dist/dao/dao-utils.dao';
import {TripDao, TripDto} from 'curb-db/dist';

@Injectable()
export class TripService {

  async create(payload: TripDto): Promise<TripDto> {
    const dao = new TripDao(DaoUtils.getDatabase());
    return dao.create(payload);
  }

  async edit(payload: TripDto): Promise<boolean> {
    const dao = new TripDao(DaoUtils.getDatabase());
    return dao.edit(payload.id, payload);
  }

}