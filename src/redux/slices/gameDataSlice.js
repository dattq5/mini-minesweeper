import { createSlice } from '@reduxjs/toolkit';

export const gameDataSlice = createSlice({
	name: 'data',
	initialState: {
		value: []
	},
	reducers: {
		initData: (state, payload) => {
			state.value = JSON.parse(JSON.stringify(payload));
		},
		getData: state => state.value,
		resetData: state => {
			state.value = [];
		}
	}
});

// Action creators are generated for each case reducer function
export const { initData, getData, resetData } = gameDataSlice.actions;

export const gameDataReducer = gameDataSlice.reducer;