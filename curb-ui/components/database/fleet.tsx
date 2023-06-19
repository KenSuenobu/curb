import axios from 'axios';

export interface IFleet {
  id?: number;
  name: string;
}

export type IFleetCallback = (payload: IFleet[]) => void;

export const LoadFleet = (callback: IFleetCallback) => {
  axios.get(`/app/fleet/list`)
    .then((x) => {
      console.log(`Loaded list: ${JSON.stringify(x.data, null, 2)}`);
      callback(x.data);
    });
}
