import React, { memo, useCallback, useEffect } from 'react';
import { BoardItemList } from '../minesweeper-refactored/board';
import {
    actionFlagCell,
    actionInitiateBoard,
    actionRevealCell,
    GameStatus,
    useCreateMineSweeperStore,
} from './mine-sweeper.store';
import './minesweeper.scss';

interface MineSweeperProps {
    height: number,
    width: number
    mines: number
}


export const Board = memo<MineSweeperProps>(({ mines: minesProp, height, width }) => {
    const useStore = useCreateMineSweeperStore();

    const { boardData, status } = useStore();
    useEffect(() => {
        actionInitiateBoard(useStore, width, height, minesProp);
    }, [height, minesProp, useStore, width]);

    const handleContextMenu = useCallback((x: number, y: number) => {
        actionFlagCell(useStore, x, y);
    }, [useStore]);

    const handleClick = useCallback((x, y) => {
        actionRevealCell(useStore, x, y);
    }, [useStore]);

    useEffect(() => {
        if (status === GameStatus.won) {
            alert('You Win');
        } else if (status === GameStatus.lose) {
            alert('You Loose');
        }
    }, [status]);

    return (
        <div className="board">
            <BoardItemList
                data={boardData}
                onContextMenu={handleContextMenu}
                onClick={handleClick}
            />
        </div>
    );
});
