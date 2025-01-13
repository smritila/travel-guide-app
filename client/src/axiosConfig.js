import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://book-your-guide.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    // If token is available, set it in the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config; // Pass the updated config to the next middleware or request handler
  },
  (error) => {
    // Handle request errors globally
    return Promise.reject(error);
  }
);

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
