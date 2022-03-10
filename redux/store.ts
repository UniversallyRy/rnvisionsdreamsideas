import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from '@reduxjs/toolkit'
// import { persistStore, persistReducer } from "redux-persist";
import visions, { VisionType } from "./reducers/visions";
import pic from "./reducers/newpic";
import journals, { JournalListType } from "./reducers/journals";
import ideas, { IdeaType } from "./reducers/ideas";
import todosLists, { TodoListType } from "./reducers/todos";

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

export type StoreProps = {
  visions: VisionType[], 
  journals: JournalListType, 
  ideas: IdeaType[],
  todosLists: TodoListType[], 
  pic: '', 
}

const store = configureStore({
  reducer: { 
    visions: visions, 
    journals: journals, 
    ideas: ideas, 
    todosLists: todosLists, 
    pic: pic, 
  }
});

// const persistor = persistStore(store);

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
