import axios from 'axios';

export const listGuests = (accessToken: any, fleetId: number, blacklisted: boolean) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/guests/list?fleetId=${fleetId}&blacklisted=${blacklisted}`, {
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

export const listAllGuests = (accessToken: any, fleetId: number) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/guests/list-all?fleetId=${fleetId}`, {
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

export const createGuest = (accessToken: any, payload: any) => {
  return new Promise((resolve, reject) => {
    axios.post('/api/guests', {
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

export const saveGuest = (accessToken: any, payload: any) => {
  return new Promise((resolve, reject) => {
    axios.put('/api/guests', {
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

export const getGuest = (accessToken: any, guestId: number) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/guests?guestId=${guestId}`, {
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
