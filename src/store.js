import {combineReducers, createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-community/async-storage';

import {app} from './core/reducers';
import nav from './reducer';
import Otions from './config';

const rootReducer = combineReducers({
	app,
	nav,
});

const persistConfig = {
	key: 'root',
	stateReconciler: autoMergeLevel2,
	whitelist: ['app'],
	timeout: null,
	storage: AsyncStorage,
};

let enhacers;

// eslint-disable-next-line
if (Otions.isLogger && __DEV__ === true) {
	enhacers = applyMiddleware(thunk, createLogger({collapsed: true}));
} else {
	enhacers = applyMiddleware(thunk);
}
export default function configureStore() {
	const store = createStore(persistReducer(persistConfig, rootReducer), undefined, enhacers);
	const persistor = persistStore(store);
	return {store, persistor};
}
