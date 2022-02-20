import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from '@reduxjs/toolkit'
// import { persistStore, persistReducer } from "redux-persist";
import visions, { VisionItem } from "./reducers/visions";
import journals, { JournalEntries } from "./reducers/journals";
import ideas, { Idea } from "./reducers/ideas";
import todosLists, { TodoListProps } from "./reducers/todos";
import pic from "./reducers/newpic";

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
  visions: VisionItem[], 
  journals: JournalEntries, 
  ideas: Idea[],
  todosLists: TodoListProps[], 
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
})

// const persistor = persistStore(store);

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
