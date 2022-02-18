import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from '@reduxjs/toolkit'
// import { persistStore, persistReducer } from "redux-persist";
import visions, { VisionItem } from "./reducers/visions";
import pic from "./reducers/newpic";
import journals, { JournalEntries } from "./reducers/journals";
import notes, { Notes } from "./reducers/note";
import todos, { TodoList } from "./reducers/todos";

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
  pic: '', 
  journals: JournalEntries, 
  todos: TodoList[], 
  notes: Notes[] 
}

const store = configureStore({
  reducer: { 
    visions: visions, 
    pic: pic, 
    journals: journals, 
    todos: todos, 
    notes: notes 
  }
})

// const persistor = persistStore(store);

export { store };
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
