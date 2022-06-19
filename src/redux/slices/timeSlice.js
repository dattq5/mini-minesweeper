import { createSlice } from '@reduxjs/toolkit';

export const timeSlice = createSlice({
	name: 'time',
	initialState: {
		value: 0
	},
	reducers: {
		startCountTime: state => {
			state.value += 1;
		},
		resetTime: (state) => {
			state.value = 0;
		}
	}
});

// Action creators are generated for each case reducer function
export const { startCountTime, resetTime } = timeSlice.actions;

export const timeReducer = timeSlice.reducer;