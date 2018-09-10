import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 30000,
  headers: { cb: process.env.TWITTER_CB_URL }
});

export default {
  async requestToken() {
    const {
      data: { data },
      errors
    } = await instance.get("?type=oauth_request");
    return {
      data,
      errors
    };
  },
  async requestAccessToken(token, tokenSecret, verifier) {
    const {
      data: { data },
      errors
    } = await instance.post("?type=auth_token", {
      token,
      tokenSecret,
      verifier
    });
    return {
      data,
      errors
    };
  },
  async fetchTweets(
    accessToken,
    accessTokenSecret,
    userId,
    latestId,
    currentListId
  ) {
    const {
      data: { data },
      errors
    } = await instance.post("?type=tweets", {
      accessToken,
      accessTokenSecret,
      userId,
      latestId,
      currentListId
    });
    return {
      data,
      errors
    };
  },
  async fetchLists(accessToken, accessTokenSecret, userId) {
    const {
      data: { data },
      errors
    } = await instance.post("?type=lists", {
      accessToken,
      accessTokenSecret,
      userId
    });
    return {
      data,
      errors
    };
  }
};
