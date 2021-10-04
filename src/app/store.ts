import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { counterToolkitReducer } from '../features/counter/counter-redux-toolkit/counter.store';
import { CounterSimpleReducer } from '../features/counter/counter-redux/counter.store';
import { AppState } from './app-state';


export const store = configureStore<AppState>({
    reducer: {
        counterSimple: CounterSimpleReducer,
        counterToolkit: counterToolkitReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
