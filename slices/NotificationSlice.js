import {createSlice} from '@reduxjs/toolkit';

const initialState = {

    identifier: null

};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.notification = action.payload;
        },
    },
});


export const {setNotification} = notificationSlice.actions;

// selectors
export default notificationSlice.reducer;