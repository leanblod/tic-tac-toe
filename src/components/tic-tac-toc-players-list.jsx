export function PlayersList({players}) {
    return (
        <div className="players-list">
            <h3>Jugadores</h3>
            <ul>{players.map(
                (player, i) => <li key={i}>{player}</li>
            )}</ul>
        </div>
    );
}