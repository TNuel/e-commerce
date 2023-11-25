import axios from "axios";
axios.defaults.baseURL = "https://fakestoreapi.com/";
// axios.defaults.baseURL = import.meta.env.VITE_HOST_NAME;
const token = localStorage.getItem("token");

axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
