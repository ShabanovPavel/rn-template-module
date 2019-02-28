import {combineReducers, createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

import {appReducer, onboardingReducer} from './modules';
import nav from './reducer';

const rootReducer = combineReducers({
	onboarding: onboardingReducer,
	app: appReducer,
	nav,
});

const persistConfig = {
	storage,
	key: 'root',
	stateReconciler: autoMergeLevel2,
	whitelist: ['app'],
};

let enhacers;

// eslint-disable-next-line
if (__DEV__ === true) {
	enhacers = applyMiddleware(thunk, createLogger({collapsed: true}));
} else {
	enhacers = applyMiddleware(thunk);
}

export default function configureStore() {
	const store = createStore(persistReducer(persistConfig, rootReducer), undefined, enhacers);
	const persistor = persistStore(store);
	return {store, persistor};
}
