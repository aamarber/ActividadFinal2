import BoardComponent from './Components/BoardComponent';
import CellComponent from './Components/CellComponent'
import BoardCell from './Domain/BoardCell';

function App() {
  let initialCell = new BoardCell(1, 1, false);
  initialCell.surroundingMinesCount = 4;
  return (
    <>
      <h1>BUSCAMINAS</h1>
      <CellComponent cell={initialCell}></CellComponent>
      <br></br>
      <BoardComponent level={0}></BoardComponent>
    </>
  )
}

export default App
