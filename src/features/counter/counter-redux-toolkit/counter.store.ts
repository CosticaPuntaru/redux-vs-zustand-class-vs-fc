import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';

export interface CounterState {
    value: number;
}

const initialState: CounterState = {
    value: 0,
};

export const counterStore = createSlice({
    name: 'counterToolkit',
    initialState,
    reducers: {
        increment: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
        decrement: (state, action: PayloadAction<number>) => {
            state.value -= action.payload;
        },
    },
});

export const { increment, decrement } = counterStore.actions;

export const selectCount = (state: RootState) => state.counterToolkit.value;

export const counterToolkitReducer = counterStore.reducer;
