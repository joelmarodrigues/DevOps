import axios from "axios";

const http = axios.create({
  baseURL: "http://34.142.56.192:5000",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*", // Allow requests from any origin
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Allow these HTTP methods
    "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Authorization", // Allow these headers
  },
  timeout: 5000, // Set the timeout to 5 seconds
});

export const fetchServerStatus = async () => {
  try {
    const response = await http.get("/api/server-status");
    console.log(response.data.status);
  } catch (error) {
    console.error("Error fetching server status:", error);
  }
};

export default http;
