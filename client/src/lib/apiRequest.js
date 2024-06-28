import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://estate-booking-nine.vercel.app/api",
  withCredentials: true,
});

export default apiRequest;
