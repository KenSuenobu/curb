import axios from 'axios';

export interface ICarTrim {
  id?: number;
  yearId: number;
  name: string;
}

export type ICarTrimCallback = (payload: ICarTrim[]) => void;

export const LoadCarTrims = (yearId: number, callback: ICarTrimCallback) => {
  axios.get(`/curb/car-trim/list/${yearId}`)
    .then((x) => {
      callback(x.data);
    });
}
