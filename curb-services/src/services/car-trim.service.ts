import { Injectable, Logger } from "@nestjs/common";
import {CarTrimDto} from 'curb-db/dist/dto';
import {DaoUtils} from 'curb-db/dist/dao/dao-utils.dao';
import {CarTrimDao} from 'curb-db/dist/dao/car-trim.dao';

@Injectable()
export class CarTrimService {
  private readonly logger = new Logger('car-trim.service');

  async createCarTrim(payload: CarTrimDto): Promise<CarTrimDto> {
    const dao = new CarTrimDao(DaoUtils.getDatabase());
    return dao.create(payload);
  }

  async listByYearId(yearId: number): Promise<CarTrimDto[]> {
    const dao = new CarTrimDao(DaoUtils.getDatabase());
    return dao.listByYearId(yearId);
  }

}