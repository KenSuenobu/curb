import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class CarMakeService {
  private readonly logger = new Logger('car-make.service');

  async createCarMake(payload: CarMakeDto): Promise<CarMakeDto> {
    const dao = new CarMakeDao(DaoUtils.getDatabase());
    return dao.create(payload);
  }

  async listCarMakes(): Promise<CarMakeDto[]> {
    const dao = new CarMakeDao(DaoUtils.getDatabase());
    return dao.list();
  }
}