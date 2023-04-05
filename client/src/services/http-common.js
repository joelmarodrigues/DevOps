import axios from "axios";

const isDevelopment = process.env.NODE_ENV === "development";

const http = axios.create({
  baseURL: isDevelopment ? "http://localhost:5000" : "http://35.242.175.209:5000",
  headers: {
    "Content-type": "application/json",
  },
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