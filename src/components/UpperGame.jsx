import Score from "./Score.jsx";

const UpperGame = ({flags, time, resetGame}) => {
    return(
        <div className={"flex justify-between items-center m-2.5 p-2.5 border-4 border-inset h-[50px]"}>
            <Score flags={flags}/>
            <button className={"flex justify-center items-center border-4 border-outset h-[29px]"} onClick={resetGame}>
                🙂
            </button>
            <Score time={time}/>
        </div>
    )
}

export default UpperGame;