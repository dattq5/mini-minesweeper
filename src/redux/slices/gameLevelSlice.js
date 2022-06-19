import { createSlice } from '@reduxjs/toolkit';

export const gameLevelSlice = createSlice({
	name: 'level',
	initialState: {
		value: ''
	},
	reducers: {
		startLevel: (state, payload) => {
			state.value = payload.payload.level;
		},
		resetLevel: (state) => {
			state.value = '';
		}
	}
});

// Action creators are generated for each case reducer function
export const { startLevel, resetLevel } = gameLevelSlice.actions;

export const gameLevelReducer = gameLevelSlice.reducer;