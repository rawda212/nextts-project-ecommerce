import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com/",
  // baseURL: "https://dummyjson.com/products/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;