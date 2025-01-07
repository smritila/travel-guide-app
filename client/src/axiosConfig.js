import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://book-your-guide.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
