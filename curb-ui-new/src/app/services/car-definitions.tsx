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

export const getAllModels = (accessToken: any, makeId: number) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/cars/model?carMakeId=${makeId}`, {
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

export const createCarModel = (accessToken: any, carMakeId: number, model: string) => {
  return new Promise((resolve, reject) => {
    axios.post('/api/cars/model', {
        carMakeId,
        model,
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

export const getAllYears = (accessToken: any, modelId: number) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/cars/years?carModelId=${modelId}`, {
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

export const createCarYear = (accessToken: any, carModelId: number, year: string) => {
  return new Promise((resolve, reject) => {
    axios.post('/api/cars/years', {
      carModelId,
      year,
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
