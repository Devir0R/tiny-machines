

export const Info = ({ score, turnsLeft }: { score: number; turnsLeft: number }) => {
    return (
        <div className="col-span-1 bg-gray-200 p-4 text-center flex flex-col items-center max-w-sm justify-self-center">
            <div>Score: {score}</div>
            <div>Turns Left: {turnsLeft}</div>
        </div>
    )
}