import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarMakeController } from './controllers/car-make.controller';
import { CarMakeService } from './services/car-make.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    CarMakeController,
  ],
  providers: [
    AppService,
    CarMakeService,
  ],
})
export class AppModule {}
