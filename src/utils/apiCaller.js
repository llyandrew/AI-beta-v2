import { Cookies } from 'react-cookie';
const BASE_URL = 'http://localhost:2541/api';

export const callApi = async (endPoint = '', method = 'GET', props = {}) => {
  try {
    const { body, contentType = 'application/json', withToken = true } = props;
    const cookies = new Cookies();

    const headers = {
      'content-type': contentType
    };

    console.log('withToken', withToken);
    if (withToken) {
      const userToken = cookies.get('userToken');
      headers.Authorization = userToken || '';
    }

    const res = await fetch(`${BASE_URL}${endPoint}`, {
      headers,
      method,
      body
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error('GG');
    }
  } catch (err) {
    console.log(err);
  }
};
