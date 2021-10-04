import React, { useCallback, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import styles from './Counter.module.css';
import { decrement, increment, selectCount } from './counter.store';

export function CounterReduxToolkit() {
    const count = useAppSelector(selectCount);
    const dispatch = useAppDispatch();
    const [incrementAmount, setIncrementAmount] = useState('2');

    const incrementValue = Number(incrementAmount) || 0;
    const handleIncrement = useCallback(() => {
        dispatch(increment(incrementValue));
    }, [dispatch, incrementValue]);

    const handleDecrement = useCallback(() => {
        dispatch(decrement(incrementValue));
    }, [dispatch, incrementValue]);
    return (
        <div>
            <h1>@Reduxjs/toolkit</h1>
            <div className={styles.row}>
                <button
                    className={styles.button}
                    aria-label="Decrement value"
                    onClick={handleDecrement}
                >
                    -
                </button>
                <span className={styles.value}>{count}</span>
                <button
                    className={styles.button}
                    aria-label="Increment value"
                    onClick={handleIncrement}
                >
                    +
                </button>
            </div>
            <div className={styles.row}>
                <input
                    className={styles.textbox}
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    onChange={(e) => setIncrementAmount(e.target.value)}
                />
            </div>
        </div>
    );
}
