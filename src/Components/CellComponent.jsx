import React from 'react';
import { useState } from 'react'
import '../index.css';
import BoardCell from '../Domain/BoardCell';

const explosionSound = new Audio('/explosion.mp3');

function CellComponent({cell, onClick}) {
  const [internalCell, setCell] = useState(cell);
  const [playExplosionSound, setPlayExplosionSound] = useState(false);

  // function handleClick(){
  //   setCell((prevCell) => {
  //     if (!prevCell.defused && !prevCell.exploded && !prevCell.flagged) {
  //       if (prevCell.hasMine) {
  //         setPlayExplosionSound(true);
  //         //prevCell.explode()
  //         return { ...prevCell, exploded: true };
  //       } else {
  //         //prevCell.defuse(4);
  //         return { ...prevCell, defused: true};
  //       }
  //     }
  //     return prevCell;
  //   });
  // }

  function handleRightClick(e){
    e.preventDefault();

    setCell((prevCell) => {
      if (!prevCell.defused && !prevCell.exploded){
        //prevCell.flag();
        return { ...prevCell, flagged: !prevCell.flagged };
      }
      return prevCell;
    });
  }

  React.useEffect(() => {
    if (playExplosionSound) {
      explosionSound.play();
      setPlayExplosionSound(false); 
    }
  }, [playExplosionSound]);

  return <>
        <div
        className={`cell ${internalCell.defused ? 'defused' : ''} ${internalCell.flagged ? 'flagged' : ''} ${internalCell.exploded ? 'exploded' : ''}`}
        id={`${internalCell.row}-${internalCell.column}`}
        onClick={onClick}
        onContextMenu={handleRightClick}
        >
          {internalCell.defused && internalCell.surroundingMinesCount > 0 && internalCell.surroundingMinesCount}
          {internalCell.flagged && '🚩'}
          {internalCell.exploded && '💣'}
        </div>
    </>
};

export default CellComponent;
