import { Injectable, Logger } from "@nestjs/common";
import {DaoUtils} from 'curb-db/dist/dao/dao-utils.dao';
import {CarYearDto} from 'curb-db/dist/dto';
import {CarYearDao} from 'curb-db/dist/dao/car-year.dao';

@Injectable()
export class CarYearService {
  private readonly logger = new Logger('car-year.service');

  async createCarYear(payload: CarYearDto): Promise<CarYearDto> {
    const dao = new CarYearDao(DaoUtils.getDatabase());
    return dao.create(payload);
  }

  async listByModelId(carModelId: number): Promise<CarYearDto[]> {
    const dao = new CarYearDao(DaoUtils.getDatabase());
    return dao.listByModelId(carModelId);
  }

}