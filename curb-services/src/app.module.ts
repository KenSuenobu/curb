import { Module } from '@nestjs/common';
import { CarMakeController } from './controllers/car-make.controller';
import { CarModelController } from './controllers/car-model.controller';
import { CarMakeService } from './services/car-make.service';
import { CarModelService } from './services/car-model.service';
import { CarYearService } from './services/car-year.service';
import { CarYearController } from './controllers/car-year.controller';
import { CarTrimService } from './services/car-trim.service';
import { CarTrimController } from './controllers/car-trim.controller';
import {CarTrimInfoController} from './controllers/car-trim-info.controller';
import {CarTrimInfoService} from './services/car-trim-info.service';
import {FleetController} from './controllers/fleet.controller';
import {FleetService} from './services/fleet.service';
import {FleetLoanController} from './controllers/fleet-loan.controller';
import {FleetLoanService} from './services/fleet-loan.service';
import {UserController} from './controllers/user.controller';
import {UserService} from './services/user.service';
import {GuestController} from './controllers/guest.controller';
import {GuestService} from './services/guest.service';
import {AddressController} from './controllers/address.controller';
import {AddressService} from './services/address.service';

@Module({
  imports: [],
  controllers: [
    AddressController,
    CarMakeController,
    CarModelController,
    CarYearController,
    CarTrimController,
    CarTrimInfoController,
    FleetController,
    FleetLoanController,
    GuestController,
    UserController,
  ],
  providers: [
    AddressService,
    CarMakeService,
    CarModelService,
    CarYearService,
    CarTrimService,
    CarTrimInfoService,
    FleetService,
    FleetLoanService,
    GuestService,
    UserService,
  ],
})
export class AppModule {}
