const BASE_URL = 'http://www.filltext.com';

export const getSmallData = () => {
  return fetch(`${BASE_URL}/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then((res) => {
    if(res.ok) {
      return res.json();
    }
    return res.json().then((data) => Promise.reject(`${res.status} - ${data.message || 'Ошибка'}`));
  });
};
export const getLargeData = () => {
  return fetch(`${BASE_URL}/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then((res) => {
    if(res.ok) {
      return res.json();
    }
    return res.json().then((data) => Promise.reject(`${res.status} - ${data.message || 'Ошибка'}`));
  });
};