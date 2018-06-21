import axios from "axios";
import config from "./environment";

const { API_URL, TWITTER_CB_URL } = config;

const instance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: { cb: TWITTER_CB_URL }
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    console.log(error);
    return Promise.reject(error.response);
  }
);

export default instance;
