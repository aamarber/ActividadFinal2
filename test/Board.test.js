import Board from '../src/Domain/Board';
import Mine from '../src/Domain/Mine';

it('creates a board', () => {

    //Arrange
    const columns = 8;
    const rows = 12;

    //Act
    const board = new Board(rows, columns);

    //Assert
    expect(board.columns.length).toBe(columns);
    expect(board.columns[0].length).toBe(rows);

    const lastCell = board.columns[columns-1][rows-1];

    expect(lastCell.row).toBe(rows - 1);
    expect(lastCell.column).toBe(columns - 1);
});

it('counts mines surrounding the cell by row and column', () => {

    //Arrange
    const columns = 4;
    const rows = 4;

    const mines = [new Mine(0, 0),new Mine(0, 1)];

    const board = new Board(rows, columns, mines);

    /**
     * This will be the board, where * is a mine and 0 is nothing
     *      *   *   0
     *      0   0   0
     *      0   0   0
     */


    //Act
    const count = board.countSurroundingMines(1, 1);

    //Assert
    /**
     * Surrounding mines at the coordinate 1, 1 should be 2 since up this coordinate there's a mine and upleft also:
     *      *   *   0
     *      0   2   0
     *      0   0   0
     */
    expect(count).toBe(2);
});

it('defuse a cell without a mine by row and column and does not explode', () => {

    //Arrange
    const columns = 4;
    const rows = 4;

    const mines = [new Mine(0, 0),new Mine(0, 1)];

    const board = new Board(rows, columns, mines);

    /**
     * This will be the board, where * is a mine and 0 is nothing
     *      *   *   0
     *      0   0   0
     *      0   0   0
     */


    //Act
    const canBeDefused = board.canBeDefused(1, 1);

    const result = board.defuse(1, 1);

    //Assert
    expect(canBeDefused).toBe(true);

    expect(result.lost).toBeFalsy();
});

it('defuse a cell WITH a mine by row and column and EXPLODES', () => {

    //Arrange
    const columns = 4;
    const rows = 4;

    const mines = [new Mine(0, 0),new Mine(0, 1)];

    const board = new Board(rows, columns, mines);

    /**
     * This will be the board, where * is a mine and 0 is nothing
     *      *   *   0
     *      0   0   0
     *      0   0   0
     */


    //Act
    const canBeDefused = board.canBeDefused(0, 0);

    //Assert
    expect(canBeDefused).toBe(false);

    //As defusing a cell with a mine throws an error, expect it.
    expect(() => {
        board.defuse(0, 0);
    }).toThrow();
});

it('defuse a cell without surrounding mines and recursively defuses the surrounding ones', () => {

    //Arrange
    const columns = 4;
    const rows = 4;

    const mines = [new Mine(0, 0),new Mine(0, 1)];

    const board = new Board(rows, columns, mines);

    /**
     * This will be the board, where * is a mine and 0 is nothing
     *      *   *   0
     *      0   0   0
     *      0   0   0
     */


    //Act
    //Defusing the mine at 2,2 should defuse that one and the surrounding ones that do not have mines surrounding.
    const result = board.defuse(2, 2);

    const defusedCell = result.getCellBy(2,2);
    const defusedCellTop = result.getCellBy(1,2);
    const defusedCellLeft = result.getCellBy(2,1);
    const defusedCellLeftTop = result.getCellBy(1,1);
    const defusedCellLeftLeft = result.getCellBy(2,0);
    const defusedCellLeftLeftTop = result.getCellBy(1,0);

    const defused = [defusedCell, defusedCellTop, defusedCellLeft, defusedCellLeftTop, defusedCellLeftLeft, defusedCellLeftLeftTop];

    //Assert
    defused.forEach(x => 
        expect(x.defused).toBe(true)
    );
});

it('flag a cell should flag it and update the count of remaining mines', () => {

    //Arrange
    const columns = 4;
    const rows = 4;

    const mines = [new Mine(0, 0),new Mine(0, 1)];

    const board = new Board(rows, columns, mines);

    /**
     * This will be the board, where * is a mine and 0 is nothing
     *      *   *   0
     *      0   0   0
     *      0   0   0
     */


    //Act
    //Flagging the mine at 0,0 should flag
    const result = board.flag(0, 0);

    const flaggedCell = result.getCellBy(0,0);

    const remainingMinesCount = result.getRemainigMinesCount();

    //Assert
    expect(flaggedCell.flagged).toBe(true);

    // As one mine is flagged and there's only one more, the remainingMinesCount should be 1
    expect(remainingMinesCount).toBe(1);
});