import { Injectable, Logger } from "@nestjs/common";
import {CarTrimInfoDto} from 'curb-db/dist/dto';
import {DaoUtils} from 'curb-db/dist/dao/dao-utils.dao';
import {CarTrimInfoDao} from 'curb-db/dist/dao/car-trim-info.dao';

@Injectable()
export class CarTrimInfoService {
  private readonly logger = new Logger('car-trim-info.service');

  async createCarTrimInfo(payload: CarTrimInfoDto): Promise<CarTrimInfoDto> {
    const dao = new CarTrimInfoDao(DaoUtils.getDatabase());
    return dao.create(payload);
  }

  async getTrimInfoByTrimId(trimId: number): Promise<CarTrimInfoDto> {
    const dao = new CarTrimInfoDao(DaoUtils.getDatabase());
    return dao.getByTrimId(trimId);
  }

  async editCarTrimInfo(trimInfoId: number, payload: CarTrimInfoDto): Promise<boolean> {
    const dao = new CarTrimInfoDao(DaoUtils.getDatabase());
    return dao.edit(trimInfoId, payload)
      .then((x) => true)
      .catch((x) => {
        this.logger.error(`Unable to edit CarTrimInfo`, x);
        return false;
      });
  }

}