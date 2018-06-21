import { Constants } from "expo";
import { API_URL } from "react-native-dotenv";

const TWITTER_CB_URL = "https://auth.expo.io/@benhowdle/readmeapp-native";

const ENV = {
  dev: {
    API_URL,
    TWITTER_CB_URL
  },
  prod: {
    API_URL:
      "https://getj104l3m.execute-api.us-west-2.amazonaws.com/production/",
    TWITTER_CB_URL
  }
};

const getEnvVars = (env = "") => {
  if (env === null || env === undefined || env === "") return ENV.dev;
  if (env === "dev") return ENV.dev;
  if (env === "prod") return ENV.prod;
};

const config = getEnvVars(Constants.manifest.releaseChannel);
export default config;
