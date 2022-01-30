import { configureStore } from '@reduxjs/toolkit'
import locationReducer from './slices/locationSlice'

export const store = configureStore({
    reducer: {
        location: locationReducer,
    },
})