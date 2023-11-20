import axios from 'axios';
import {
  BedroomParentOutlined,
  GarageOutlined,
  HouseOutlined,
  LocalAirportOutlined,
  QuestionMarkOutlined
} from '@mui/icons-material';

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

export const getTripsByType = (accessToken: any, fleetId: number, tripType: string) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/trip/list/${tripType}?fleetId=${fleetId}`, {
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

export const deleteTrip = (accessToken: any, tripId: number) => {
  return new Promise((resolve, reject) => {
    axios.delete(`/api/trip?tripId=${tripId}`, {
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

export const imageForCategory = (category: number) => {
  switch(category) {
    case 1:
      return (<LocalAirportOutlined/>);

    case 2:
      return (<BedroomParentOutlined/>);

    case 3:
      return (<GarageOutlined/>);

    case 4:
      return (<HouseOutlined/>);
  }

  return (<QuestionMarkOutlined/>);
}