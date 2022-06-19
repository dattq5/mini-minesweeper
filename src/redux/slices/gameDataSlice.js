import { createSlice } from '@reduxjs/toolkit';

const initState = {
	numOfMines: 0,
	countUnopen: -1,
	gameData: [],
	resultData: [],
	gameResultMessage: '',
	isPlaying: false
};

export const gameDataSlice = createSlice({
	name: 'data',
	initialState: {
		value: {...initState}
	},
	reducers: {
		initData: (state, payload) => {
			state.value = {...state.value, ...payload.payload};
		},
		getData: state => state.value,
		resetData: state => {
			state.value = JSON.parse(JSON.stringify(initState));
		}
	}
});

// Action creators are generated for each case reducer function
export const { initData, getData, resetData } = gameDataSlice.actions;

export const gameDataReducer = gameDataSlice.reducer;