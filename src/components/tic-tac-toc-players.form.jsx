import { useMemo } from "react";

export default function TicTacTocPlayers({ players, setPlayers }) {
    const playersList = players.map((player, index) =>
        <li key={`player-${player}-${index}`}>
            <input name={`player-${index}`} type="text" defaultValue={player} onChange={(ev)=>{
                players[index] = ev.target.value;
            }} />
            <button type="button" className="remove" disabled={players.length <= 2} onClick={() => {
                setPlayers(players.toSpliced(index, 1));
            }}></button>
        </li>
    );

    return (
        <div className="players-form">
            Jugadores:
            <ul>
                {playersList}
            </ul>
            <button type="button" className="add" onClick={() => {
                if(players[players.length-1]) {
                    setPlayers([
                        ...players,
                        "",
                    ]);
                }
            }}>Agregar jugador</button>
        </div>
    );
}