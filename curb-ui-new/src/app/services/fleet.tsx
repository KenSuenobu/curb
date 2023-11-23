import axios from 'axios';

export const getAllFleets = (accessToken: any) => {
  return new Promise((resolve, reject) => {
    fetch('/api/fleet', {
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

export const createFleet = (accessToken: any, fleet: string) => {
  return new Promise((resolve, reject) => {
    axios.post('/api/fleet', {
      fleet,
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

export const getFleetCars = (accessToken: any, fleetId: number) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/fleet/cars?fleetId=${fleetId}`, {
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

export const getFleetCarById = (accessToken: any, fleetCarId: number) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/fleet/cars?fleetCarId=${fleetCarId}`, {
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

export const addFleetCar = (accessToken: any, fleetId: number, carTrimId: number) => {
  return new Promise((resolve, reject) => {
    axios.post('/api/fleet/cars', {
      fleetId,
      carTrimId,
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

export const saveFleetCarData = (accessToken: any, payload: any) => {
  return new Promise((resolve, reject) => {
    axios.put('/api/fleet/cars', {
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

export const createFleetLoan = (accessToken: any, payload: any) => {
  return new Promise((resolve, reject) => {
    axios.post('/api/fleet/loan', {
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

export const saveFleetLoan = (accessToken: any, payload: any) => {
  return new Promise((resolve, reject) => {
    axios.put('/api/fleet/loan', {
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

export const loadFleetLoan = (accessToken: any, fleetCarId: number) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/fleet/loan?fleetCarId=${fleetCarId}`, {
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
