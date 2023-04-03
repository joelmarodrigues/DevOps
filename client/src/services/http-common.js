import axios from "axios";

const primaryServer = "http://192.158.168:5000";
const localServer = "http://localhost:5000";

const isRunningLocally = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

const http = axios.create({
  baseURL: isRunningLocally ? localServer : primaryServer,
  headers: {
    "Content-type": "application/json",
  },
});

export default http;