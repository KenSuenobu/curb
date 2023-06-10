import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarMakeController } from './controllers/car-make.controller';
import { CarModelController } from './controllers/car-model.controller';
import { CarMakeService } from './services/car-make.service';
import { CarModelService } from './services/car-model.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    CarMakeController,
    CarModelController,
  ],
  providers: [
    AppService,
    CarMakeService,
    CarModelService,
  ],
})
export class AppModule {}
