import { Injectable, Logger } from "@nestjs/common";
import { CarModelDto } from "curb-db/dist/dto";
import {DaoUtils} from 'curb-db/dist/dao/dao-utils.dao';
import {CarModelDao} from 'curb-db/dist/dao/car-model.dao';

@Injectable()
export class CarModelService {
  private readonly logger = new Logger('car-model.service');

  async createCarModel(payload: CarModelDto): Promise<CarModelDto> {
    const dao = new CarModelDao(DaoUtils.getDatabase());
    return dao.create(payload);
  }

  async listByMakeId(makeId: number): Promise<CarModelDto[]> {
    const dao = new CarModelDao(DaoUtils.getDatabase());
    return dao.listByMakeId(makeId);
  }

}