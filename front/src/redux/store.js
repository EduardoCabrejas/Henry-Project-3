import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';
import turnsReducer from '../reducers/turnsReducer';
import profileReducer from '../reducers/profileReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    turns: turnsReducer,
    profile: profileReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
