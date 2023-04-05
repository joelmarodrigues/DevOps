import axios from "axios";

const primaryServer = "http://35.242.175.209:5000";
const localServer = "http://localhost:5000";

const isRunningLocally = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

const http = axios.create({
  baseURL: isRunningLocally ? localServer : primaryServer,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true, // Add this line to enable CORS requests
});

export default http;
