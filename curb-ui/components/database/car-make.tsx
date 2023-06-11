import axios from 'axios';

export interface ICarMake {
  id?: number;
  name: string;
}

export interface ICarMakesProperties {
  setter: (data: ICarMake[]) => void;
}

export type ICarMakeCallback = (payload: ICarMake[]) => void;

export const ListCarMakes = (callback: ICarMakeCallback) => {
  axios.get('/app/car-make/list')
    .then((x) => {
      callback(x.data);
    });
};
