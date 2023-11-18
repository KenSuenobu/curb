import axios from 'axios';

export const createAddress = (accessToken: any, payload: any) => {
  return new Promise((resolve, reject) => {
    axios.post('/api/addresses', {
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

export const saveAddress = (accessToken: any, payload: any) => {
  return new Promise((resolve, reject) => {
    axios.put('/api/addresses', {
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

export const listAddresses = (accessToken: any, fleetId: number) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/addresses/list?fleetId=${fleetId}`, {
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

export const getAddress = (accessToken, addressId: number) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/addresses?addressId=${addressId}`, {
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
