import axios from "axios";
import { API_URL } from "react-native-dotenv";

const instance = axios.create({
  baseURL: API_URL,
  timeout: 5000
});

export default instance;
