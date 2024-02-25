import {DaoUtils} from 'curb-db/dist/dao/dao-utils.dao';
import {
  CarTrimDao,
  FleetCarDao,
  FleetCarLoanDao,
  FleetMembershipDao,
  GuestDao,
  LoanPaymentDao,
  TripDao,
  UserDao
} from 'curb-db/dist';
import {Logger} from '@nestjs/common';

export class DashboardService {
  private readonly logger = new Logger('dashboard.service');

  async list(userId: number, year: string) : Promise<any[]> {
    const userDao = new UserDao(DaoUtils.getDatabase());
    const userInfo = await userDao.getById(userId);
    const fleetMembershipDao = new FleetMembershipDao(DaoUtils.getDatabase());
    const fleets = await fleetMembershipDao.getFleetsForUser(userInfo.id);
    const fleetCars: any[] = [];
    const fleetCarsDao = new FleetCarDao(DaoUtils.getDatabase());
    const fleetCarLoanDao = new FleetCarLoanDao(DaoUtils.getDatabase());
    const tripDao = new TripDao(DaoUtils.getDatabase());
    const guestDao = new GuestDao(DaoUtils.getDatabase());
    // const loanPaymentDao = new LoanPaymentDao(DaoUtils.getDatabase());
    const earnings = await tripDao.totalEarningsPerMonth();
    const trips = await tripDao.totalTripsPerMonth();

    for (const fleet of fleets) {
      const fleetCarsList = await fleetCarsDao.listByFleetId(fleet.id);

      for (const fleetCar of fleetCarsList) {
        if (fleetCar.data.enabled !== 'false') {
          const tripsTotal = await tripDao.summationByFleetCarId(fleetCar.id, year);
          // const loanTotal = await loanPaymentDao.summationByFleetCarId(fleetCar.id);
          const totalMileage = await tripDao.totalMilesForFleetCarId(fleetCar.id, year);
          const totalEarnings = await tripDao.totalEarningsPerMonthByFleetCarId(fleetCar.id, year);
          const totalTrips = await tripDao.totalTripsPerMonthByFleetCarId(fleetCar.id, year);
          const nextTrip = await tripDao.getNextTripForFleetCarId(fleetCar.id, year);
          const totalNumberOfTrips = await tripDao.totalTripsForFleetCarId(fleetCar.id, year);
          const carLoan = await fleetCarLoanDao.getByFleetCarId(fleetCar.id);
          const currentTrip = await tripDao.getCurrentByFleetCarId(fleetCar.id, year);
          const currentTripGuest = currentTrip ? await guestDao.getById(currentTrip.guestId) : {};

          fleetCars.push({
            ...fleetCar,
            grossTotal: tripsTotal,
            // loanTotal: loanTotal,
            loanTotal: 0.00,
            milesTotal: totalMileage,
            nextTrip: nextTrip ? nextTrip.startTime : null,
            tripsCount: totalNumberOfTrips,
            tripCarEarnings: totalEarnings,
            tripCarTrips: totalTrips,
            listingUrl: fleetCar.data.listingUrl,
            trackingUrl: fleetCar.data.trackingUrl ?? '',
            carLoan: carLoan?.data ?? {},
            currentTrip,
            currentTripGuest,
            earnings,
            trips,
          });
        }
      }
    }

    return fleetCars;
  }

  async carDefinitionsDashboard(userId: number): Promise<any> {
    const carDefinitionsDao = new CarTrimDao(DaoUtils.getDatabase());

    return {
      totalTrims: await carDefinitionsDao.getTotalTrims(),
      totalContributed: await carDefinitionsDao.getTotalTrimsForUser(userId),
    };
  }

}