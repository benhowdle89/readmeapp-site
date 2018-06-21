import { SecureStore } from "expo";

export default {
  async save(key, value) {
    return await SecureStore.setItemAsync(key, value);
  },
  async get(key) {
    return await SecureStore.getItemAsync(key);
  }
};
