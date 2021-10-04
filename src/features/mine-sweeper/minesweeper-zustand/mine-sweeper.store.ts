import { useMemo } from 'react';
import create, { UseStore } from 'zustand';
import {
    cloneDeep,
    computeCellClick,
    getFlags,
    getHidden,
    getMines,
    initBoardData,
    revealBoard,
} from '../minesweeper-refactored/mine-sweeper.utils';

export interface CellValue {
    isRevealed: boolean,
    isMine: boolean,
    isFlagged: boolean,
    isEmpty: boolean,
    neighbour: number,
    x: number,
    y: number,
}

interface MineSweeperState {
    boardData: CellValue[][],
    mines: number,
    remainingMines: number,
    status: GameStatus
}

export enum GameStatus {
    initial,
    running,
    won,
    lose,

}

export function useCreateMineSweeperStore() {
    return useMemo(() => create<MineSweeperState>(() => ({
        boardData: [],
        status: GameStatus.initial,
        mines: 0,
        remainingMines: 0,
    })), []);
}


export function actionInitiateBoard(useStore: UseStore<MineSweeperState>, width: number, height: number, mines: number) {
    useStore.setState({
        status: GameStatus.running,
        mines,
        remainingMines: mines,
        boardData: initBoardData(height, width, mines),
    });
}

export function actionRevealCell(useStore: UseStore<MineSweeperState>, x: number, y: number) {
    const { remainingMines, mines, boardData } = useStore.getState();

    if (boardData[x][y].isRevealed) {
        return;
    }
    let won = GameStatus.running;

    if (boardData[x][y].isMine) {
       won = GameStatus.lose;
    }
    const updatedData = computeCellClick(boardData, x, y, mines);
    if (getHidden(updatedData).length === mines) {
        won = GameStatus.won;
    }
    useStore.setState({
        status: won,
        remainingMines,
        mines,
        boardData: updatedData,
    });
}

export function actionFlagCell(useStore: UseStore<MineSweeperState>, x: number, y: number) {
    const { remainingMines, mines, boardData, status } = useStore.getState();
    let newMineCount = remainingMines;
    let win = false;

    // check if already revealed
    if (boardData[x][y].isRevealed) {
        return;
    }
    const updatedData = cloneDeep(boardData);

    if (updatedData[x][y].isFlagged) {
        updatedData[x][y].isFlagged = false;
        newMineCount++;
    } else {
        updatedData[x][y].isFlagged = true;
        newMineCount--;
    }

    if (newMineCount === 0) {
        const mineArray = getMines(updatedData);
        const FlagArray = getFlags(updatedData);
        win = (JSON.stringify(mineArray) === JSON.stringify(FlagArray));
        if (win) {
            useStore.setState({
                status: GameStatus.won,
                mines: mines,
                boardData: revealBoard(updatedData),
                remainingMines: 0,
            });
        }
    } else {
        useStore.setState({
            status: status,
            mines: mines,
            boardData: updatedData,
            remainingMines: getMines(updatedData).length,
        });
    }
}
