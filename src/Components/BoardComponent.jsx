import React from 'react';
import { useState, useEffect} from 'react';
import '../index.css';
import CellComponent from './CellComponent';
import ApiClient from '../Services/ApiClient';
import BoardCell from '../Domain/BoardCell';
import Board from '../Domain/Board';

function BoardComponent({level}){

  const [board, setBoard] = useState(null);

  useEffect(() => {
    const fetchData = async () =>{
      const api = new ApiClient(`https://quiet-kangaroo-2938f6.netlify.app/`);
      try{
        const data = await api.getLevel(level);
        setBoard(new Board(data.rows, data.columns, data.mines, level));
      }catch(error){
        console.error('Error fetching level data: ', error);
      }
    }
    fetchData();
  })

  // board.buildBoard(rows, columns) = board.columns //Construye una matriz de objetos BoardCell con los parámetros ya seteados
  // board.getCellBy(row, column) // Devuelve el objeto BoardCell pasandole el numero de fila y columna
  // board.flag(row, column) //cambia el estado de la celda a flagged

  /* Que el componente CellComponent no tenga la lógica de cambiar estados y que solo devuelva un div con el dibujo. Meter parámetro onClick y click derecho
  Que el BoardComponent, dado el nivel, cree el grid con su mecánica de juego, creamos las funciones de los botones y se lo pasamos a cada CellComponent
  Que el GameComponent permita seleccionar nivel y devuelva el BoardComponent*/

  const generateGrid = () => {
    if (board) {
      const grid = [];
      board.columns.forEach((row, rowIndex) => {
        const cellsInRow = row.map((cell, columnIndex) => (
          <CellComponent 
          key={`${rowIndex}-${columnIndex}`} 
          cell={cell} 
          onClick={() => handleClick(rowIndex, columnIndex)}/>
        ));
        grid.push(<div key={rowIndex} className="row">{cellsInRow}</div>);
      });
      return grid;
    }
    return null;
  };

  // board.defuse(row, column) //Cambia el estado de la celda por defused, además cambia el parámetro de surroundingMinesCount 
  // board.exploded(row, column) //cambia el estado de la celda a exploded
  function handleClick(row, column){
    const cell = board.getCellBy(row, column);
    console.log(cell)
    if(!cell.defused && !cell.exploded && !cell.flagged){
      if(cell.hasMine){
        console.log('Tiene mina')
        board.exploded(row, column);
        console.log(cell)
      }else{
        console.log('No tiene mina')
        board.defuse(row, column)
        console.log(cell)
      }
    }
  }

  return(
    <>
      <div>
        {board && (
          <div>
            <h1>Columns: {board.columns.length}</h1>
            <h1>Rows: {board.columns[0].length}</h1>
            <div className="minesweeper-board">
              {generateGrid()}
            </div>
          </div>
        ) || (
          <div className='error'>
            No se ha podido cargar el juego
          </div>
        )}
      </div>
    </>
  )
}
export default BoardComponent;
