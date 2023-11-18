import axios from 'axios';

export const createTrip = (accessToken: any, payload: any) => {
  return new Promise((resolve, reject) => {
    axios.post('/api/trip', {
        payload,
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

export const saveTrip = (accessToken: any, payload: any) => {
  return new Promise((resolve, reject) => {
    axios.put('/api/trip', {
        payload,
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

export const loadTrips = (accessToken: any, fleetCarId: number) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/trip?fleetCarId=${fleetCarId}`, {
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
}