import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    location : {
        lat: 48.856614,
        lng: 	2.3522219,
        city: "Paris",
        country: "France"
    },
};

export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload;
        },
    },
});


export const {setLocation} = locationSlice.actions;

// selectors
export default locationSlice.reducer;