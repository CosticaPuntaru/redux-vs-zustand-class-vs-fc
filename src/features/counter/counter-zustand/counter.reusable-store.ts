import { useMemo } from 'react';
import create, { UseStore } from 'zustand';


export interface CounterZustandState {
    counter: number,
}


function useStoreCreator() {
    return useMemo(() => {
        return create<CounterZustandState>(() => ({
            counter: 0,
        }));
    }, []);
}


function incrementStore(useStore: UseStore<CounterZustandState>, value: number) {
    const state = useStore.getState();
    useStore.setState({
        counter: state.counter + value,
    });
}

function decrementStore(useStore: UseStore<CounterZustandState>, value: number) {
    const state = useStore.getState();
    useStore.setState({
        counter: state.counter - value,
    });
}
