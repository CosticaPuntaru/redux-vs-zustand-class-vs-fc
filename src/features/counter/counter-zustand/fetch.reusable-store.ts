import { useMemo } from 'react';
import create, { State, UseStore } from 'zustand';

export enum FetchStatus {
    Loading,
    Success,
    Failed,
}

export interface LoadingState extends State {
    status: FetchStatus.Loading,
}

export interface SuccessState<T> extends State {
    status: FetchStatus.Success,
    data: T
}

export interface FailedState extends State {
    status: FetchStatus.Failed,
    error: any,
}

export type FetchState<T> = LoadingState | SuccessState<T> | FailedState;

export function useFetchStoreCreator<T>(input: RequestInfo): UseStore<FetchState<T>> {
    return useMemo(() => {
        const store = create<FetchState<T>>(() => ({
            status: FetchStatus.Loading,
        }));
        fetch(input)
            .then((request) => request.json())
            .then((data: T) => {
                store.setState({
                    status: FetchStatus.Success,
                    data,
                });
            })
            .catch((error) => {
                store.setState({
                    status: FetchStatus.Failed,
                    error,
                });
            });
        return store;
    }, [input]);
}

