import axios from 'axios';

export interface IFleetCar {
  id?: number;
  fleetId: number;
  carTrimId: number;
  data: any;
}

export type IFleetCarCallback = (payload: IFleetCar[]) => void;

export const LoadFleetCars = (fleetId: number, callback: IFleetCarCallback) => {
  axios.get(`/app/fleet/list/${fleetId}`)
    .then((x) => {
      console.log(`Loaded list: ${JSON.stringify(x.data, null, 2)}`);
      callback(x.data);
    });
}
