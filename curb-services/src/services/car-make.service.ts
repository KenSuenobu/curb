import { Injectable, Logger } from "@nestjs/common";
import {CarMakeDto} from "curb-db/dist/dto";
import {DaoUtils} from "curb-db/dist/dao/dao-utils.dao";
import {CarMakeDao} from "curb-db/dist/dao/car-make.dao";

@Injectable()
export class CarMakeService {
  private readonly logger = new Logger('car-make.service');

  async createCarMake(payload: CarMakeDto): Promise<CarMakeDto> {
    const dao = new CarMakeDao(DaoUtils.getDatabase());
    return dao.create(payload);
  }

  async listCarMakes(): Promise<CarMakeDto[]> {
    const dao = new CarMakeDao(DaoUtils.getDatabase());
    return dao.list();
  }
}