import { AnyAction } from '@reduxjs/toolkit';
import { AppState } from '../../../app/app-state';

enum CounterSimpleActionType {
    INCREMENT = 'INCREMENT',
    DECREMENT = 'DECREMENT',
}

interface CounterSimpleActionIncrement {
    type: CounterSimpleActionType.INCREMENT,
    value: number,
}

interface CounterSimpleActionDecrement {
    type: CounterSimpleActionType.DECREMENT,
    value: number,
}

type CounterSimpleActions = CounterSimpleActionDecrement | CounterSimpleActionIncrement;

export interface CounterSimpleState {
    counter: number;
}

const initialState: CounterSimpleState = {
    counter: 0,
};

export function increment(value: number): CounterSimpleActionIncrement {
    return {
        type: CounterSimpleActionType.INCREMENT,
        value,
    };
}

export function decrement(value: number): CounterSimpleActionDecrement {
    return {
        type: CounterSimpleActionType.DECREMENT,
        value,
    };
}

export function selectCounterSimple(state: AppState): number {
    return state.counterSimple.counter;
}

export function CounterSimpleReducer(state = initialState, action: CounterSimpleActions | AnyAction): CounterSimpleState {
    switch (action.type) {
        case CounterSimpleActionType.INCREMENT:
            return {
                counter: state.counter + action.value,
            };
        case CounterSimpleActionType.DECREMENT:
            return {
                counter: state.counter - action.value,
            };
        default:
            return state;
    }
}
