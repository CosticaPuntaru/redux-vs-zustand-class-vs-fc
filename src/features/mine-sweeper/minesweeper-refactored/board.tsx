import React, { memo, useCallback, useEffect, useState } from 'react';
import { Cell, CellClickHandler, CellValue } from './cell';
import {
    cloneDeep,
    computeCellClick,
    getFlags,
    getHidden,
    getMines,
    initBoardData,
    revealBoard,
} from './mine-sweeper.utils';
import './minesweeper.scss';

interface MineSweeperProps {
    height: number,
    width: number
    mines: number
}


export const Board = memo<MineSweeperProps>(({ mines, height, width }) => {
    const [boardData, setBoardData] = useState<CellValue[][]>(() => initBoardData(height, width, mines));
    const [mineCount, setMineCount] = useState<number>(mines);
    const [won, setWon] = useState<boolean>(false);

    useEffect(() => {
        setBoardData(initBoardData(height, width, mines));
    }, [height, width, mines]);

    const handleContextMenu = useCallback((x: number, y: number) => {
        let newMineCount = mineCount;
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
                setBoardData(revealBoard(updatedData));
                alert('You Win');
            }
        }

        setBoardData(updatedData);
        setMineCount(getMines(updatedData).length);
        setWon(win);
    }, [boardData, mineCount]);

    const handleClick = useCallback((x, y) => {
        if (boardData[x][y].isRevealed) {
            return;
        }
        if (boardData[x][y].isMine) {
            alert('game over');
        }
        const updatedData = computeCellClick(boardData, x, y, mines);

        if (getHidden(updatedData).length === mines) {
            setWon(true);
            alert('You Win');
        }
        setBoardData(updatedData);
        setMineCount(mines - getFlags(updatedData).length);
    }, [boardData, mines]);


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


interface BoardItemListProps extends CellClickHandler {
    data: CellValue[][],
}

export const BoardItemList = memo<BoardItemListProps>(({ data, onContextMenu, onClick }) => {
    return (
        <>
            {data.map((dataRow, x) => (
                <div key={'row-' + x * dataRow.length}>
                    {
                        dataRow.map((dataItem) => (
                            <div key={'Cell-' + dataItem.x * dataRow.length + dataItem.y}>
                                <Cell
                                    onClick={onClick}
                                    onContextMenu={onContextMenu}
                                    value={dataItem}
                                />
                                {(dataRow[dataRow.length - 1] === dataItem) ? <div className="clear" /> : ''}
                            </div>
                        ))
                    }
                </div>
            ))}
        </>
    );
});
