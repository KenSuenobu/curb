import axios from 'axios';

export const getAllMakes = (accessToken: any) => {
  return new Promise((resolve, reject) => {
    fetch('/api/cars/make', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      }
    })
      .then((res) => {
        res.json()
          .then(json => resolve(json))
          .catch(e => reject(e))
      })
      .catch(e => reject(e));
  });
};

export const createCarMake = (accessToken: any, make: string) => {
  return new Promise((resolve, reject) => {
    axios.post('/api/cars/make', {
      make,
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      }
    })
      .then((res) => resolve(res.data))
      .catch(e => reject(e));
  });
}
