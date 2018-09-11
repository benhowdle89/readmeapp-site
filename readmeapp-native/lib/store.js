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
  const builtStore = {
    ...deserialisedStore,
    tweetsLoading: initialState.tweetsLoading,
    tokenRequestLoading: initialState.tokenRequestLoading,
    accessTokenLoading: initialState.accessTokenLoading,
    listsLoading: initialState.listsLoading
  };
  Object.keys(initialState).forEach(initialKey => {
    if (!(initialKey in builtStore)) {
      builtStore[initialKey] = initialState[initialKey];
    }
  });
  const store = createStore(
    reducer,
    builtStore,
    applyMiddleware(axiosMiddleware(api))
  );

  const handleStoreChange = () => {
    const current = store.getState();
    const allowed = Object.keys(current)
      .filter(key => {
        return ![
          "tweetsLoading",
          "tokenRequestLoading",
          "accessTokenLoading",
          "listsLoading"
        ].includes(key);
      })
      .reduce((accum, curr) => {
        return {
          ...accum,
          [curr]: current[curr]
        };
      }, {});
    const serialised = JSON.stringify(allowed);
    storage.save(STORAGE_KEY, serialised);
  };

  store.subscribe(handleStoreChange);
  return store;
};

export default configureStore;
