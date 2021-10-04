import React, { useCallback, useState } from 'react';
import styles from './Counter.module.css';
import { decrement, increment, useCounterStore } from './counter.store';

export function CounterZustand() {
    const { counter } = useCounterStore();
    const [incrementAmount, setIncrementAmount] = useState('2');

    const incrementValue = Number(incrementAmount) || 0;
    const handleIncrement = useCallback(() => {
        increment(incrementValue);
    }, [incrementValue]);

    const handleDecrement = useCallback(() => {
        decrement(incrementValue);
    }, [incrementValue]);

    return (
        <div>
            <h1>Zustand</h1>
            <div className={styles.row}>
                <button
                    className={styles.button}
                    aria-label="Decrement value"
                    onClick={handleDecrement}
                >
                    -
                </button>
                <span className={styles.value}>{counter}</span>
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
