import { configureStore } from '@reduxjs/toolkit'
import { createStore, applyMiddleware } from "redux";
// import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  // configuration object for redux-persist
  key: "root",
  storage: AsyncStorage, // define which storage to use
  blacklist: ["navigation"],
};

// const persistedReducer = persistReducer(persistConfig, rootReducer); // create a persisted reducer
// const persistedState = loadFromLocal();

// const store = createStore(
//   rootReducer,
//   applyMiddleware(),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
const store = configureStore({
  reducer: rootReducer
})

// const persistor = persistStore(store);

export { store };
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
