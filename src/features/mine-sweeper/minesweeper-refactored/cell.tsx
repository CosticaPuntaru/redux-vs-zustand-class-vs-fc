import React, { memo, useCallback, MouseEvent } from 'react';

export interface CellValue {
    isRevealed: boolean,
    isMine: boolean,
    isFlagged: boolean,
    isEmpty: boolean,
    neighbour: number,
    x: number,
    y: number,
}

export interface CellClickHandler {
    onClick: (x: number, y: number) => void,
    onContextMenu: (x: number, y: number) => void,
}

export interface CellProps extends CellClickHandler {
    value: CellValue;
}


function getLabel(value: CellValue) {
    if (!value.isRevealed) {
        return value.isFlagged ? '🚩' : null;
    }
    if (value.isMine) {
        return '💣';
    }
    if (value.neighbour === 0) {
        return null;
    }
    return value.neighbour;
}

export const Cell = memo<CellProps>(({ value, onContextMenu, onClick }) => {
    let className = 'cell' + (value.isRevealed ? '' : ' hidden') + (value.isMine ? ' is-mine' : '') + (value.isFlagged ? ' is-flag' : '');

    const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        onClick(value.x, value.y);
    }, [onClick, value.x, value.y]);

    const handleContextMenu = useCallback((e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        onContextMenu(value.x, value.y);
    }, [onContextMenu, value.x, value.y]);

    return (
        <div onClick={handleClick} className={className} onContextMenu={handleContextMenu}>
            {getLabel(value)}
        </div>
    );
});
