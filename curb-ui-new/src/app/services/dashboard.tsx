export const getCarDefinitionsDashboard = (accessToken: any) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/dashboard/car-definitions`, {
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

export const loadDashboard = (accessToken: any, year: string) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/dashboard?year=${year}`, {
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