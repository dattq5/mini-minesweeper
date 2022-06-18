import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { gameDataReducer } from './slices/gameDataSlice';
import { gameLevelReducer } from './slices/gameLevelSlice';
import { timeReducer } from './slices/timeSlice';

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
};

const rootReducer = combineReducers({gameData: gameDataReducer, gameLevel: gameLevelReducer, time: timeReducer});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		})
});
const persistor = persistStore(store);

export {
	store,
	persistor
};