import UpperGame from "./UpperGame.jsx";
import LowerGame from "./LowerGame.jsx";
import {useState, useEffect} from "react";

const Game = () => {
    const [flags, setFlags] = useState(10);
    const [bombs, setBombs] = useState(10);
    const [time, setTime] = useState(120);
    const [gameOver, setGameOver] = useState(false);

    const minusFlag = () => {
        setFlags(flags -1);
    }

    const increaseFlag = () => {
        setFlags(flags + 1);
    }

    const restoreFlag = () => {
        setFlags(10);
    }

    const minusBombs = () => {
        setBombs(bombs -1);
    }

    const restoreBombs = () => {
        setBombs(10);
    }

    const endGame = () => {
        setGameOver(true);
    }

    const resetGame = () => {
        restoreFlag();
        restoreBombs();
        setGameOver(false);
        setTime(120);
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
                    bombs={bombs}
                    gameOver={gameOver}
                />
            </div>
        </div>
    )
}

export default Game;