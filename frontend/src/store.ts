// store/index.ts

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authorizationReducer from './AuthorizationSlice'; 

const rootReducer = combineReducers({
  authorization: authorizationReducer, 
});

export const store = configureStore({ reducer: rootReducer });


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;