import axios from "axios";
import { API_URL } from "react-native-dotenv";

const TWITTER_CB_URL = "https://auth.expo.io/@benhowdle/readmeapp-native";

const instance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: { cb: TWITTER_CB_URL }
});

export default instance;
