import axios from 'axios';

const db = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {'Authorization': localStorage.getItem('token')}
});

export default db;