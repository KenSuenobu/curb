import { Injectable, Logger } from "@nestjs/common";
import {FleetCarDto, FleetDto} from 'curb-db/dist/dto';
import {DaoUtils} from "curb-db/dist/dao/dao-utils.dao";
import {FleetCarDao, FleetDao} from 'curb-db/dist/dao';
import {FleetCarLoanDao, FleetCarLoanDto, FleetMembershipDao, FleetMembershipDto} from 'curb-db/dist';

@Injectable()
export class FleetService {
  private readonly logger = new Logger('fleet.service');

  async createFleet(userId: number, payload: FleetDto): Promise<FleetDto> {
    const dao = new FleetDao(DaoUtils.getDatabase());
    const fleetMembershipDao = new FleetMembershipDao(DaoUtils.getDatabase());
    const result = await dao.create(payload);
    const fleetMembershipPayload: FleetMembershipDto = {
      userId,
      fleetId: result.id,
    };
    const result2 = await fleetMembershipDao.create(fleetMembershipPayload);

    return result;
  }

  async createFleetCar(payload: FleetCarDto): Promise<FleetCarDto> {
    const dao = new FleetCarDao(DaoUtils.getDatabase());
    return dao.create(payload);
  }

  async createFleetCarLoan(payload: FleetCarLoanDto): Promise<FleetCarLoanDto> {
    const dao = new FleetCarLoanDao(DaoUtils.getDatabase());
    return dao.create(payload);
  }

  async assignUserToFleet(payload: FleetMembershipDto): Promise<FleetMembershipDto> {
    const dao = new FleetMembershipDao(DaoUtils.getDatabase());
    return dao.create(payload);
  }

  async addEmailToFleet(fleetId: number, email: string): Promise<boolean> {
    const dao = new FleetMembershipDao(DaoUtils.getDatabase());
    return dao.addEmailToFleet(fleetId, email);
  }

  async saveCarFleet(payload: FleetCarDto): Promise<boolean> {
    const dao = new FleetCarDao(DaoUtils.getDatabase());
    return dao.edit(payload.id, payload);
  }

  async find(key: string, value: string): Promise<FleetCarDto[]> {
    const dao = new FleetCarDao(DaoUtils.getDatabase());
    return dao.find(key, value);
  }

  async saveCarFleetLoan(payload: FleetCarLoanDto): Promise<boolean> {
    const dao = new FleetCarLoanDao(DaoUtils.getDatabase());
    return dao.edit(payload.id, payload);
  }

  async getFleetCarLoan(fleetCarId: number): Promise<FleetCarLoanDto> {
    const dao = new FleetCarLoanDao(DaoUtils.getDatabase());
    return dao.getByFleetCarId(fleetCarId);
  }

  async listFleetsByUser(userId: number): Promise<FleetDto[]> {
    const dao = new FleetMembershipDao(DaoUtils.getDatabase());
    return dao.getFleetsForUser(userId);
  }

  async listFleetCars(fleetId: number): Promise<FleetCarDto[]> {
    const dao = new FleetCarDao(DaoUtils.getDatabase());
    return dao.listByFleetId(fleetId);
  }

  async listFleetMembers(fleetId: number): Promise<string[]> {
    const dao = new FleetMembershipDao(DaoUtils.getDatabase());
    return dao.getUsersForFleet(fleetId);
  }
}