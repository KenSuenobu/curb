import {Injectable, Logger} from '@nestjs/common';
import {DeliveryAddressDao, DeliveryAddressDto} from 'curb-db/dist';
import {DaoUtils} from 'curb-db/dist/dao/dao-utils.dao';

@Injectable()
export class AddressService {
  private readonly logger = new Logger('address.service');

  async createDeliveryAddress(payload: DeliveryAddressDto): Promise<boolean> {
    const dao = new DeliveryAddressDao(DaoUtils.getDatabase());
    return dao.create(payload)
      .then((x) => true)
      .catch((x) => {
        this.logger.error(`Unable to add delivery address: ${x}`, x);
        return false;
      });
  }

  async saveDeliveryAddress(payload: DeliveryAddressDto): Promise<boolean> {
    const dao = new DeliveryAddressDao(DaoUtils.getDatabase());
    return dao.edit(payload.id, payload)
      .then((x) => true)
      .catch((x) => {
        this.logger.error(`Unable to save delivery address: ${x}`, x);
        return false;
      });
  }

  async listDeliveryAddressesForFleetId(fleetId: number): Promise<DeliveryAddressDto[]> {
    const dao = new DeliveryAddressDao(DaoUtils.getDatabase());
    return dao.listForFleetId(fleetId);
  }

  async getDeliveryAddressByAddressId(addressId: number): Promise<DeliveryAddressDto> {
    const dao = new DeliveryAddressDao(DaoUtils.getDatabase());
    return dao.getById(addressId);
  }

}