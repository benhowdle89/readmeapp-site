import { createStore, applyMiddleware } from "redux";
import axiosMiddleware from "redux-axios-middleware";

import reducer, { initialState } from "./reducer";
import api from "./api";
import storage from "./storage";

const STORAGE_KEY = "readmeapp";

const configureStore = async () => {
  const storedStore = await storage.get(STORAGE_KEY);
  const deserialisedStore = storedStore
    ? JSON.parse(storedStore)
    : initialState;

  const store = createStore(
    reducer,
    deserialisedStore,
    applyMiddleware(axiosMiddleware(api))
  );

  const handleStoreChange = () => {
    const current = store.getState();
    const serialised = JSON.stringify(current);
    storage.save(STORAGE_KEY, serialised);
  };

  store.subscribe(handleStoreChange);
  return store;
};

export default configureStore;
