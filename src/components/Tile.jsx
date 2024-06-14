import { useEffect } from "react";

const Tile = ({ value, flags, handleTileUpdate, endGame, gameOver, minusFlag, increaseFlag, showAllBombs }) => {
    useEffect(() => {
        handleShowBomb();
    }, [value]);

    const handleShowBomb = () => {
        if (value.show && value.hasBomb) {
            return true;
        }
        return false;
    };

    const handleRightClick = (e) => {
        e.preventDefault();
        if (value.show) {
            return;
        }

        const [row, col] = value.id.split('-').map(Number);

        if (value.isFlagged) {
            increaseFlag();
            const updatedTile = { ...value, isFlagged: false };
            console.log(updatedTile);
            handleTileUpdate(row, col, updatedTile);
        }
        else {
            if (flags > 0) {
                minusFlag();
                const updatedTile = { ...value, isFlagged: true };
                console.log(updatedTile);
                handleTileUpdate(row, col, updatedTile);
            }
        }
    };

    return (
        <div id={value.id} className={`flex items-center justify-center text-center border-2 border-outset ${value.show ? "bg-gray-400" : ""}`} onContextMenu={handleRightClick}>
            {handleShowBomb() && (
                <div className={"flex items-center justify-center bg-red-600 w-full h-full"}>
                    <i className="fa-solid fa-land-mine-on"></i>
                </div>
            )}

            {!value.hasBomb && value.show && (
                <div className="flex items-center justify-center w-full h-full">
                    {value.bombsAround}
                </div>
            )}

            {value.isFlagged && !value.show && (
                <div className="flex items-center justify-center w-full h-full">
                    <i className="fa-solid fa-flag text-red-600"></i>
                </div>
            )}
        </div>
    );
};

export default Tile;
