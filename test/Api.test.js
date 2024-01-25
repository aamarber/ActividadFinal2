import Board from '../src/Domain/Board';
import ApiClient from '../src/Services/ApiClient';

const apiURL = 'https://quiet-kangaroo-2938f6.netlify.app/';

test('gets the board data', async () => {

    //Arrange
    const apiClient = new ApiClient(apiURL);

    //Act
    const levelData = await apiClient.getLevel(0);

    //Assert
    expect(levelData.columns).toBeGreaterThan(0);
    expect(levelData.rows).toBeGreaterThan(0);
});

test('gets the board data', async () => {

    //Arrange
    const apiClient = new ApiClient(apiURL);

    //Act
    const levelData = await apiClient.getLevel(0);

    const board = new Board(levelData.rows, levelData.columns, levelData.mines);

    //Assert
    expect(board.columns.length).toBe(levelData.columns);
    expect(board.columns[0].length).toBe(levelData.rows);
    expect(board.mines.length).toBe(levelData.mines.length);
});