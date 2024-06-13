
const Score = ({flags, time}) => {
    return (
        <div className={"score-format"}>
            <p className={"flex  font-digital text-3xl text-red-800 opacity-50 "}>888</p>
            <p className={"absolute font-digital text-3xl text-red-600"}>{flags !== undefined ? flags : time}</p>
        </div>
    )
}

export default Score;