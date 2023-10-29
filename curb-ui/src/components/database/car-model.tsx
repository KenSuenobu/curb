import axios from 'axios';

export interface ICarModel {
  id?: number;
  makeId: number;
  name: string;
}

export type ICarModelCallback = (payload: ICarModel[]) => void;

export const LoadCarModels = (makeId: number, callback: ICarModelCallback) => {
  axios.get(`/curb/car-model/list/${makeId}`)
    .then((x) => {
      callback(x.data);
    });
}
