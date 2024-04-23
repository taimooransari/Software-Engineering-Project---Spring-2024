

// /* Core */
// import {
//   configureStore,
//   type ThunkAction,
//   type Action,
// } from "@reduxjs/toolkit";
// import {
//   useSelector as useReduxSelector,
//   useDispatch as useReduxDispatch,
//   type TypedUseSelectorHook,
// } from "react-redux";

// /* Instruments */
// import { reducer } from "./rootReducer";
// import { middleware } from "./middleware";

// export const reduxStore = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) => {
//     return getDefaultMiddleware().concat(middleware);
//   },
// });
// export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
// export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

// /* Types */
// export type ReduxStore = typeof reduxStore;
// export type ReduxState = ReturnType<typeof reduxStore.getState>;
// export type ReduxDispatch = typeof reduxStore.dispatch;
// export type ReduxThunkAction<ReturnType = void> = ThunkAction<
//   ReturnType,
//   ReduxState,
//   unknown,
//   Action
// >;

/* Core */
import {
  configureStore,
  type ThunkAction,
  type Action,
} from "@reduxjs/toolkit";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from "react-redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to using localStorage

/* Instruments */
import { reducer } from "./rootReducer";
import { middleware } from "./middleware";
import { combineReducers } from "redux";

const rootReducer = combineReducers(reducer);

// Define your persist config
const persistConfig = {
 key: 'root', // key is required
 storage, // define which storage to use
 whitelist: ['auth', 'cart'] // choose which reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const reduxStore = configureStore({
 reducer: persistedReducer,
 middleware: (getDefaultMiddleware) =>
   getDefaultMiddleware({
     serializableCheck: {
       ignoredActions: ['persist/PERSIST'], // Necessary to avoid issues with Redux Persist
     },
   }).concat(middleware),
});

export const persistor = persistStore(reduxStore); // create a persistor object

export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

/* Types */
export type ReduxStore = typeof reduxStore;
export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
 ReturnType,
 ReduxState,
 unknown,
 Action
>;
