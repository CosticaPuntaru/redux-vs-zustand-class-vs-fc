import { FormEvent, useCallback } from 'react';
import { Board } from './board';

export function MineSweeperFC() {
    const handleSubmit = useCallback((e: FormEvent) => {
        e.preventDefault();
    }, []);

    return (
        <>
            <h1>Mine Sweeper</h1>
            <h3>Initial source: https://github.com/saninmersion/react-minesweeper</h3>
            <form
                onSubmit={handleSubmit}
            >

                <Board height={10} width={10} mines={10} />
                <button>Submit</button>
            </form>
        </>
    );

}
