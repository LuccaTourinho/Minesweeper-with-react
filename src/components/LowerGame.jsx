import Tile from "./Tile.jsx";
import {useState} from "react";

const LowerGame = ({flags, gameOver, grid, handleTileUpdate, minusFlag, increaseFlag, endGame, showAllBombs}) => {

    return(
        <div className={"mx-2.5 border-4 border-inset h-[406.5px]"}>
            <div className={"grid grid-cols-9 gap-0 w-full h-full"}>
                {
                    grid.flat().map(tile => (
                        <Tile key={tile.id} value={tile} handleTileUpdate={handleTileUpdate} endGame={endGame} minusFlag={minusFlag} increaseFlag={increaseFlag} showAllBombs={showAllBombs}/>
                    ))
                }
            </div>
        </div>
    )
}

export default LowerGame;