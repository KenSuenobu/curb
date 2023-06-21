import { Injectable, Logger } from "@nestjs/common";
import {FleetCarDto, FleetDto} from 'curb-db/dist/dto';
import {DaoUtils} from "curb-db/dist/dao/dao-utils.dao";
import {FleetCarDao, FleetDao} from 'curb-db/dist/dao';

@Injectable()
export class FleetService {
  private readonly logger = new Logger('fleet.service');

  async createFleet(payload: FleetDto): Promise<FleetDto> {
    const dao = new FleetDao(DaoUtils.getDatabase());
    return dao.create(payload);
  }

  async createFleetCar(payload: FleetCarDto): Promise<FleetCarDto> {
    const dao = new FleetCarDao(DaoUtils.getDatabase());
    return dao.create(payload);
  }

  async listFleets(): Promise<FleetDto[]> {
    const dao = new FleetDao(DaoUtils.getDatabase());
    return dao.list();
  }

  async listFleetCars(fleetId: number): Promise<FleetCarDto[]> {
    const dao = new FleetCarDao(DaoUtils.getDatabase());
    return dao.listByFleetId(fleetId);
  }
}