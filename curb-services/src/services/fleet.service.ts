import { Injectable, Logger } from "@nestjs/common";
import {FleetDto} from 'curb-db/dist/dto';
import {DaoUtils} from "curb-db/dist/dao/dao-utils.dao";
import {FleetDao} from 'curb-db/dist/dao';

@Injectable()
export class FleetService {
  private readonly logger = new Logger('fleet.service');

  async createFleet(payload: FleetDto): Promise<FleetDto> {
    const dao = new FleetDao(DaoUtils.getDatabase());
    return dao.create(payload);
  }

  async listFleets(): Promise<FleetDto[]> {
    const dao = new FleetDao(DaoUtils.getDatabase());
    return dao.list();
  }
}