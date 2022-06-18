import { createSlice } from '@reduxjs/toolkit';
import { APP_CONSTANTS } from '../../utils/constants';

export const gameLevelSlice = createSlice({
	name: 'level',
	initialState: {
		value: ''
	},
	reducers: {
		startBeginnerLevel: state => {
			state.value = APP_CONSTANTS.GAME_LEVEL.BEGINNER;
		},
		startIntermediateLevel: state => {
			state.value = APP_CONSTANTS.GAME_LEVEL.INTERMEDIATE;
		},
		resetLevel: (state) => {
			state.value = '';
		}
	}
});

// Action creators are generated for each case reducer function
export const { startBeginnerLevel, startIntermediateLevel, resetLevel } = gameLevelSlice.actions;

export const gameLevelReducer = gameLevelSlice.reducer;