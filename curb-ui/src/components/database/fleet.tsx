import axios from 'axios';

export interface IFleet {
  id?: number;
  name: string;
}

export type IFleetCallback = (payload: IFleet[]) => void;

export const LoadFleet = (userId: number, callback: IFleetCallback) => {
  axios.get(`/curb/fleet/list/${userId}`)
    .then((x) => {
      console.log(`Loaded list: ${JSON.stringify(x.data, null, 2)}`);
      callback(x.data);
    });
}
