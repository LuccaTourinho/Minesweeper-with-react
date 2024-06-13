import {useState} from "react";

const Tile = ({value, handleTileUpdate, endGame, gameOver,minusFlag, increaseFlag,showAllBombs}) => {
    const [showBombIcon, setShowBombIcon] = useState(false);

    const handleShowBomb = () => {
        if (value.show && value.hasBomb) {
            setShowBombIcon(true);
        }
    };

    useState(() => {
        handleShowBomb();
    }, []);

    return (
        <div id={value.id} className={`flex items-center justify-center text-center border-2 border-outset ${value.show ? "bg-gray-400" : "" }`}>
            {showBombIcon && (
                <div className={"flex items-center justify-center bg-red-600 w-full h-full"}>
                    <i className="fa-solid fa-land-mine-on"></i>
                </div>
            )}

            {!value.hasBomb &&  (
                <div className="flex items-center justify-center w-full h-full">
                    {value.bombsAround}
                </div>
            )}
        </div>
    )
}

export default Tile;