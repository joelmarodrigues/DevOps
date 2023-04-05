import axios from "axios";

const isDevelopment = process.env.NODE_ENV === 'development';

const http = axios.create({
  baseURL: isDevelopment ? "http://localhost:5000" : "http://35.242.175.209:5000",
  headers: {
    "Content-type": "application/json",
  },
});

export default http;
