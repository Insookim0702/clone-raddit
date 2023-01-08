import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:4000/api",
});

request.defaults.timeout = 2000;

export default request;
