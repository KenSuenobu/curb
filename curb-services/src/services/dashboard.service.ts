import {DaoUtils} from 'curb-db/dist/dao/dao-utils.dao';
import {FleetCarDao, FleetDao, FleetMembershipDao, LoanPaymentDao, TripDao, UserDao} from 'curb-db/dist';

export class DashboardService {

  async list(userId: string) : Promise<any[]> {
    const userDao = new UserDao(DaoUtils.getDatabase());
    const userInfo = await userDao.getUserInfo(userId);
    const fleetMembershipDao = new FleetMembershipDao(DaoUtils.getDatabase());
    const fleets = await fleetMembershipDao.getFleetsForUser(userInfo.id);
    const fleetCars: any[] = [];
    const fleetCarsDao = new FleetCarDao(DaoUtils.getDatabase());
    const tripDao = new TripDao(DaoUtils.getDatabase());
    const loanPaymentDao = new LoanPaymentDao(DaoUtils.getDatabase());

    for (const fleet of fleets) {
      const fleetCarsList = await fleetCarsDao.listByFleetId(fleet.id);

      for (const fleetCar of fleetCarsList) {
        const tripsTotal = await tripDao.summationByFleetCarId(fleetCar.id);
        const loanTotal = await loanPaymentDao.summationByFleetCarId(fleetCar.id);
        const nextTrip = await tripDao.getNextTripForFleetCarId(fleetCar.id);
        const totalNumberOfTrips = await tripDao.totalTripsForFleetCarId(fleetCar.id);

        fleetCars.push({
          ...fleetCar,
          grossTotal: tripsTotal,
          loanTotal: loanTotal,
          nextTrip: nextTrip ? nextTrip.startTime : null,
          tripsCount: totalNumberOfTrips,
        });
      }
    }

    return fleetCars;
  }

}