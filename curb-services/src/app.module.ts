import { Module } from '@nestjs/common';
import { CarMakeController } from './controllers/car-make.controller';
import { CarModelController } from './controllers/car-model.controller';
import { CarMakeService } from './services/car-make.service';
import { CarModelService } from './services/car-model.service';
import {CarYearService} from './services/car-year.service';
import {CarYearController} from './controllers/car-year.controller';

@Module({
  imports: [],
  controllers: [
    CarMakeController,
    CarModelController,
    CarYearController,
  ],
  providers: [
    CarMakeService,
    CarModelService,
    CarYearService,
  ],
})
export class AppModule {}
