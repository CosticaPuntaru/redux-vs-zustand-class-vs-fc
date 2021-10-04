import { CounterState } from '../features/counter/counter-redux-toolkit/counter.store';
import { CounterSimpleState } from '../features/counter/counter-redux/counter.store';

export interface AppState {
    counterSimple: CounterSimpleState;
    counterToolkit: CounterState;
}

