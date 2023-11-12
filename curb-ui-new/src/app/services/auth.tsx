import axios from 'axios';

export const registerUser = (email: any, password: any) => {
  return new Promise((resolve, reject) => {
    fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => {
        res.json()
          .then(json => resolve(json))
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  });
}

export const createSignup = (emailAddress: string, ipAddress: string, source: string, note: string) => {
  return new Promise((resolve, reject) => {
    fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({emailAddress, ipAddress, source, note}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      res.json()
         .then(json => resolve(json))
         .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  });
}

export const changePassword = (accessToken: string, oldPassword: string, newPassword: string) => {
  return new Promise((resolve, reject) => {
    axios.put('/api/profile', {
      oldPassword,
      newPassword,
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