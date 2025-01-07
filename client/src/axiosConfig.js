import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://book-your-guide.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Process the response before passing it to the application
    return response.data;
  },
  (error) => {
    // Handle errors globally
    console.error("API Error:", error.response);
    const { status, data } = error.response;
    const message = data?.error || "Something went wrong!";
    return Promise.reject({ status, message });
  }
);

export default axiosInstance;
