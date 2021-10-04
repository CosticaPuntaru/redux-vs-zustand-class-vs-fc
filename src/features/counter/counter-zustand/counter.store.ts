import create from 'zustand';

export interface CounterZustandState {
    counter: number,
}

// with SSR this will create isues, you need to use context for ssr to work
export const useCounterStore = create<CounterZustandState>(() => ({
    counter: 0,
}));

export function increment(value: number) {
    const state = useCounterStore.getState();
    useCounterStore.setState({
        counter: state.counter + value,
    });
}

export function decrement(value: number) {
    const state = useCounterStore.getState();
    useCounterStore.setState({
        counter: state.counter - value,
    });
}
