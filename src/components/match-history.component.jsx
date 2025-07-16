import { useEffect, useState } from "react";
import MatchHistoryPreviewLink from "./match-history-preview-link.component";

export default function MatchHistory({ play, setPlay }) {

    const [history, setHistory] = useState([]);

    useEffect(function () {
        history.splice(play.playNumber, Infinity, play);
        setHistory([...history]);
    }, [play]);

    return (
        <div className='history'>
            <h3>Jugadas anteriores</h3>
            <ul>
                {
                    history.slice(0, history.length - 1).map(
                        (previousPlay) => {
                            return <li key={`history-${previousPlay.playNumber}`}>
                                <MatchHistoryPreviewLink
                                    previousPlay={previousPlay}
                                    setPlay={setPlay} />
                            </li>
                        })
                }
            </ul>
        </div>
    );

}