import UpperGame from "./UpperGame.jsx";
import LowerGame from "./LowerGame.jsx";
import {useState, useEffect} from "react";

const Game = () => {
    const [flags, setFlags] = useState(10);
    const [bombs, setBombs] = useState(10);
    const [time, setTime] = useState(120);
    const [gameOver, setGameOver] = useState(false);
    const [grid, setGrid] = useState(() => initializeGrid());


    const minusFlag = () => {
        setFlags(flags -1);
    }

    const increaseFlag = () => {
        setFlags(flags + 1);
    }

    const restoreFlag = () => {
        setFlags(10);
    }

    const endGame = () => {
        setGameOver(true);
    }

    const resetGame = () => {
        restoreFlag();
        setGameOver(false);
        setTime(120);
        setGrid(() => initializeGrid());
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prevTime => prevTime - 1);
        }, 1000);

        if (time === 0) {
            setGameOver(true);
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [time]);

    function initializeGrid() {
        let gridArray = Array.from({ length: 9 }, (_, rowIndex) =>
            Array.from({ length: 9 }, (_, colIndex) => {
                return {
                    id: `${rowIndex}-${colIndex}`,
                    isFlagged: false,
                    hasBomb: false,
                    bombsAround: "",
                    show: false
                };
            })
        );

        let gridWithBombs = putBombs(gridArray, bombs);
        return countBombs(gridWithBombs);
    }

    function putBombs(grid, bombsToPlace){
        let remainingBombs = bombsToPlace;
        while(remainingBombs > 0){
            let randomRow = Math.floor(Math.random() * 9);
            let randomCol = Math.floor(Math.random() * 9);
            if(!grid[randomRow][randomCol].hasBomb){
                grid[randomRow][randomCol].hasBomb = true;
                remainingBombs--;
            }
        }
        return grid;
    }

    function countBombs(grid) {
        let numRows = grid.length;
        let numCols = grid[0].length;

        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                if (!grid[row][col].hasBomb) {
                    let bombCount = 0;

                    for (let i = row - 1; i <= row + 1; i++) {
                        for (let j = col - 1; j <= col + 1; j++) {
                            if (i >= 0 && i < numRows && j >= 0 && j < numCols) {
                                if (grid[i][j].hasBomb) {
                                    bombCount++;
                                }
                            }
                        }
                    }

                    grid[row][col].bombsAround = bombCount > 0 ? bombCount.toString() : "";
                }
            }
        }

        return grid;
    }

    function handleTileUpdate(row, col, newTile) {
        setGrid(prevGrid => {
            const newGrid = [...prevGrid];
            newGrid[row][col] = newTile;
            return newGrid;
        });
    }
    const showAllBombs = () => {
        setGrid(prevGrid => {
            const newGrid = prevGrid.map(row =>
                row.map(tile => ({
                    ...tile,
                    show: tile.hasBomb ? true : tile.show
                }))
            );
            return newGrid;
        });
    };


    return(
        <div className={"w-[400px] h-[500px] sm:w-[500px] md:w-[600px] lg:w-[800px] xl:w-[900px] bg-gray-300  border-outset border-8"}>
            <div className={"flex flex-col m-0 p-0"}>
                <UpperGame
                    flags={flags}
                    time={time}
                    resetGame={resetGame}
                />
                <LowerGame
                    flags={flags}
                    gameOver={gameOver}
                    grid={grid}
                    handleTileUpdate={handleTileUpdate}
                    minusFlag={minusFlag}
                    increaseFlag={increaseFlag}
                    endGame={endGame}
                    showAllBombs={showAllBombs}
                />
            </div>
        </div>
    )
}

export default Game;