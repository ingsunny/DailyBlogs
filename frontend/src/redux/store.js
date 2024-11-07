import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";
import postReducer from "./slices/postSlice.js";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const rootReducer = combineReducers({ user: userReducer, post: postReducer });

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
