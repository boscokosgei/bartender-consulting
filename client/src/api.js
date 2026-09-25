import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api';

export const getSolutions = () => axios.get(`${API_URL}/solutions`);
export const getServices = () => axios.get(`${API_URL}/services`);
