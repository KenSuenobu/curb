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

  async getUpcomingTrips(fleetId: number): Promise<TripDto[]> {
    const dao = new TripDao(DaoUtils.getDatabase());
    return dao.listUpcoming(fleetId);
  }

  async getPastTrips(fleetId: number): Promise<TripDto[]> {
    const dao = new TripDao(DaoUtils.getDatabase());
    return dao.listPast(fleetId);
  }

  async getCurrentTrips(fleetId: number): Promise<TripDto[]> {
    const dao = new TripDao(DaoUtils.getDatabase());
    return dao.listCurrent(fleetId);
  }

  async getTripsForGuestId(guestId: number): Promise<TripDto[]> {
    const dao = new TripDao(DaoUtils.getDatabase());
    return dao.listByGuestId(guestId);
  }

  async getTripsForFleetCarId(fleetCarId: number): Promise<TripDto[]> {
    const dao = new TripDao(DaoUtils.getDatabase());
    return dao.listByFleetCarId(fleetCarId);
  }

  async find(payload: any): Promise<TripDto> {
    const dao = new TripDao(DaoUtils.getDatabase());
    return dao.find(payload.fleetCarId, payload.tripTime);
  }

  async delete(tripId: number): Promise<boolean> {
    const dao = new TripDao(DaoUtils.getDatabase());
    return dao.deleteById(tripId);
  }

  async get(tripId: number): Promise<TripDto> {
    const dao = new TripDao(DaoUtils.getDatabase());
    return dao.getTripByTripId(tripId);
  }

}