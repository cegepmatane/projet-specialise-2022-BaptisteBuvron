import {applyMiddleware, combineReducers, configureStore, createStore} from '@reduxjs/toolkit'
import locationReducer from './slices/locationSlice'
import notificationReducer from "./slices/NotificationSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

const rootReducer = combineReducers({
    locationReducer: persistReducer(persistConfig, locationReducer),
    notificationReducer: persistReducer(persistConfig, notificationReducer),
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);

/*
export const store = configureStore({
    reducer: {
        location: locationReducer,
    },
})*/
