import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

export const dateSlice = createSlice({
    name: 'date',
    initialState: {
        value: moment.utc().format("YYYY-MM-DD"),
    },
    reducers: {
        setNewDate: (state, action) => { state.value = action.payload }
    },
});

export const { setNewDate } = dateSlice.actions;
export const selectDate = (state: any) => state.date.value;

export default dateSlice.reducer;