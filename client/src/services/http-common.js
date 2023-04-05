import axios from "axios";

const http = axios.create({
  baseURL: "http://34.142.56.192:5000",
  headers: {
    "Content-type": "application/json",
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
