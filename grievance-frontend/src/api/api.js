import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-grievance-redressal-system-1.onrender.com",
});

export default API;

