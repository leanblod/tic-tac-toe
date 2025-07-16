import { useState, BaseSyntheticEvent, ReactElement } from 'react';
import TicTacToe from './components/tic-tac-toe.component';
import TicTacToeConfig from './components/tic-tac-toc-config.form';
import clsx from 'clsx';
import { ExpansiblePanel } from './components/expasible-panel';

export default function App() {
    const [gameConfig, setGameConfig] = useState({
        players: [
            'X',
            'O',
        ],
        rows: 3,
        columns: 3,
        consecutives: 3,
        expanded: true,
    });

    return (
        <>
            <div>
                <ExpansiblePanel expanded={gameConfig.expanded}>
                    <TicTacToeConfig config={gameConfig} setConfig={setGameConfig} />
                </ExpansiblePanel>
                <h3 className="expansion-trigger" onClick={() => setGameConfig({...gameConfig, expanded: !gameConfig.expanded})}>
                    <p>{gameConfig.expanded ? "Ocultar" : "Mostrar"} la configuración del juego</p>
                    <span className={clsx("icon", !gameConfig.expanded && "collapsed")}>{'<'}</span>
                </h3>
            </div>
            <TicTacToe config={gameConfig} />
        </>
    );
}
