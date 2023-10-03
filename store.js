
// import rootReducer from "./reducers/index";
// import { createStore, applyMiddleware } from 'redux'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// const persistConfig = {
//     key: 'main-root',
//     storage,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)


// let store = createStore(persistedReducer, applyMiddleware())
// let persistor = persistStore(store)

// export default store;
// export {persistor};

import rootReducer from "./reducers/index";
import { createStore, applyMiddleware } from "redux";

// Create the store without Redux Persist
let store = createStore(rootReducer, applyMiddleware());

export default store;
    