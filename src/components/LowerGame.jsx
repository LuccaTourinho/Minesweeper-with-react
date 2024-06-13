import Tile from "./Tile.jsx";

const LowerGame = () => {
    const gridItems = Array.from({ length: 81 }, (_, index) => {
        const row = Math.floor(index / 9);
        const col = (index % 9) + 1;
        return `${row}-${col}`;
    });

    return(
        <div className={"mx-2.5 border-4 border-inset h-[406.5px]"}>
            <div className={"grid grid-cols-9 gap-0 w-full h-full"}>
                {
                    gridItems.map(item => (
                        <Tile key={item} value={item} />
                    ))
                }
            </div>
        </div>
    )
}

export default LowerGame;