import { CellValue } from './cell';

export function getMines(data: CellValue[][]): CellValue[] {
    let mineArray: CellValue[] = [];

    data.forEach((dataRow) => {
        dataRow.forEach((dataItem) => {
            if (dataItem.isMine) {
                mineArray.push(dataItem);
            }
        });
    });

    return mineArray;
}

export function getFlags(data: CellValue[][]): CellValue[] {
    let mineArray: CellValue[] = [];

    data.forEach((dataRow) => {
        dataRow.forEach((dataItem) => {
            if (dataItem.isFlagged) {
                mineArray.push(dataItem);
            }
        });
    });

    return mineArray;
}

export function getHidden(data: CellValue[][]): CellValue[] {
    let mineArray: CellValue[] = [];

    data.forEach((datarow) => {
        datarow.forEach((dataitem) => {
            if (!dataitem.isRevealed) {
                mineArray.push(dataitem);
            }
        });
    });

    return mineArray;
}

function getRandomNumber(dimension: number): number {
    // return Math.floor(Math.random() * dimension);
    return Math.floor((Math.random() * 1000) + 1) % dimension;
}

function plantMines(data: CellValue[][], height: number, width: number, mines: number): CellValue[][] {
    let randomx, randomy, minesPlanted = 0;

    while (minesPlanted < mines) {
        randomx = getRandomNumber(width);
        randomy = getRandomNumber(height);
        if (!(data[randomx][randomy].isMine)) {
            data[randomx][randomy].isMine = true;
            minesPlanted++;
        }
    }

    return (data);
}

function getNeighbours(data: CellValue[][], height: number, width: number): CellValue[][] {
    let updatedData = data;

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (data[i][j].isMine !== true) {
                let mine = 0;
                const area = traverseBoard(data[i][j].x, data[i][j].y, data);
                area.forEach((value) => {
                    if (value.isMine) {
                        mine++;
                    }
                });
                if (mine === 0) {
                    updatedData[i][j].isEmpty = true;
                }
                updatedData[i][j].neighbour = mine;
            }
        }
    }

    return (updatedData);
}

export function initBoardData(height: number, width: number, mines: number): CellValue[][] {
    let data: CellValue[][] = [];

    for (let i = 0; i < height; i++) {
        data.push([]);
        for (let j = 0; j < width; j++) {
            data[i][j] = {
                x: i,
                y: j,
                isMine: false,
                neighbour: 0,
                isRevealed: false,
                isEmpty: false,
                isFlagged: false,
            };
        }
    }
    data = plantMines(data, height, width, mines);
    data = getNeighbours(data, height, width);
    return data;
}

function traverseBoard(x: number, y: number, data: CellValue[][]) {
    const el = [];
    const updatedData = cloneDeep(data);
    const height = updatedData.length;
    const width = updatedData[0].length;
    //up
    if (x > 0) {
        el.push(updatedData[x - 1][y]);
    }

    //down
    if (x < height - 1) {
        el.push(updatedData[x + 1][y]);
    }

    //left
    if (y > 0) {
        el.push(updatedData[x][y - 1]);
    }

    //right
    if (y < width - 1) {
        el.push(updatedData[x][y + 1]);
    }

    // top left
    if (x > 0 && y > 0) {
        el.push(updatedData[x - 1][y - 1]);
    }

    // top right
    if (x > 0 && y < width - 1) {
        el.push(updatedData[x - 1][y + 1]);
    }

    // bottom right
    if (x < height - 1 && y < width - 1) {
        el.push(updatedData[x + 1][y + 1]);
    }

    // bottom left
    if (x < height - 1 && y > 0) {
        el.push(updatedData[x + 1][y - 1]);
    }

    return el;
}

export function revealEmpty(x: number, y: number, data: CellValue[][]): CellValue[][] {
    let area = traverseBoard(x, y, data);
    area.forEach((value) => {
        if (!value.isRevealed && (value.isEmpty || !value.isMine)) {
            data[value.x][value.y].isRevealed = true;
            if (value.isEmpty) {
                revealEmpty(value.x, value.y, data);
            }
        }
    });
    return data;
}

export function revealBoard(data: CellValue[][]): CellValue[][] {
    const updatedData = cloneDeep(data);

    updatedData.forEach((datarow) => {
        datarow.forEach((dataitem) => {
            dataitem.isRevealed = true;
        });
    });
    return updatedData;
}

export function cloneDeep<T>(data: T): T {
    return JSON.parse(JSON.stringify(data));
}


export function computeCellClick(boardData: CellValue[][], x: number, y: number, mines: number): CellValue[][] {
    if (boardData[x][y].isRevealed) {
        return boardData;
    }

    if (boardData[x][y].isMine) {
        return revealBoard(boardData);
    }

    let updatedData = cloneDeep(boardData);
    updatedData[x][y].isFlagged = false;
    updatedData[x][y].isRevealed = true;

    if (updatedData[x][y].isEmpty) {
        updatedData = revealEmpty(x, y, updatedData);
    }

    if (getHidden(updatedData).length === mines) {
        return revealBoard(boardData);
    }
    return updatedData;
}
