import axios from 'axios';

export interface ICarYear {
  id?: number;
  modelId: number;
  year: number;
}

export type ICarYearCallback = (payload: ICarYear[]) => void;

export const LoadModelYears = (modelId: number, callback: ICarYearCallback) => {
  axios.get(`/curb/car-year/list/${modelId}`)
    .then((x) => {
      callback(x.data);
    });
}
