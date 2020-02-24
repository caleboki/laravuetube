import axios from 'axios';

export default () => {
  //let currentUser = JSON.parse(window.localStorage.currentUser);
  //let currentUser = localStorage.getItem('currentUser')
  //let currentUser = JSON.parse(localStorage.getItem('currentUser'))
  let token = JSON.parse(localStorage.getItem('token'))
  return axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost:8000/api',
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: 'Bearer' + '' + token
    }
  });
} 