import Board from "./board.component";

export default function MatchHistoryPreviewLink({previousPlay, setPlay}) {
    const playNumber = previousPlay.playNumber;

    return (
        <div className="link">
            <div className="preview">
                <Board grid={previousPlay.board} />
            </div>
            <button onClick={() => {
                setPlay(previousPlay);
            }}>
                {
                    playNumber === 0 ?
                        `Reiniciar partida` :
                        `<< Volver al turno ${playNumber}`
                }
            </button>
        </div>
    );
}