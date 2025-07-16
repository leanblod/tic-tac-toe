import { useEffect, useState } from 'react';
import Board from './board.component';
import MatchHistory from './match-history.component';
import { PlayersList } from './tic-tac-toc-players-list';

export default function TicTacToe({ config }) {

    const [match, setMatch] = useState(new Match(config));

    useEffect(() => {
        setMatch(new Match(config));
    }, [config])

    return (
        <div className='tic-tac-toe'>
            <h2 className='status'>
                {
                    match.onProgress ?
                        `Es el turno de ${match.currentPlayer}` :
                        match.winner ?
                            `La partida finalizó, ganó ${match.winner}` :
                            `La partida finalizó, hubo empate`
                }
            </h2>
            <div className='game'>
                <Board grid={match.board} onClick={match.playTurn.bind(match, setMatch)} />
                <MatchHistory play={match} setPlay={setMatch} />
                <PlayersList players={config.players} />
            </div>
        </div>
    )
}

function playTurn({ row, column }) {

}


class Match {

    onProgress = true;

    _winner = undefined;

    get winner() {
        return this._winner;
    }

    set winner(player?) {
        if (player) {
            this._winner = player;
            this.onProgress = false;
        }
    }

    playNumber = 0;

    config;

    constructor(config) {
        this.config = config;
        this.board = Array(this.config.rows).fill().map(
            () => Array(this.config.columns).fill(null)
        );
    }

    get currentPlayer() {
        const players = this.config.players;
        return players[this.playNumber % players.length];
    }

    playTurn(setMatch, { row, column }) {
        if (!this.board[row][column] && this.onProgress) {
            const currentBoard = this.board;
            this.board = Array.from(this.board, (row) => [...row]);
            this.board[row][column] = this.currentPlayer;
            setMatch(this.nextTurn);

            this.board = currentBoard;
        }
    }

    get nextTurn() {
        if (this.onProgress) {
            this.checkIfConcluded();

            const nextTurnMatch = new Match(this.config);
            nextTurnMatch.board = this.board;
            nextTurnMatch.playNumber = this.playNumber + 1;
            nextTurnMatch.winner = this.winner;
            nextTurnMatch.onProgress = this.onProgress;


            return nextTurnMatch;
        } else {
            return this;
        }
    }

    checkIfConcluded() {

        const { rows, columns, consecutives } = this.config;

        let boardIsFull = true;

        for (let i = 0;i < rows;i++) {

            const edgeCaseCondition = i < consecutives - 2 || rows - i < consecutives - 1;
            const startColumn = edgeCaseCondition ? consecutives - 2 : 0;
            const endColumn = columns - (edgeCaseCondition ? consecutives - 2 : 0);

            for (let j = startColumn;j < endColumn;j++) {

                const player = this.board[i][j];

                if (player) {
                    // Chech row
                    this.checkLine({
                        player, row: i, column: j, vertical: false,
                    });
                    // Check column
                    this.checkLine({
                        player, row: i, column: j, vertical: true,
                    });
                    // Check diagonal ul-dr
                    this.checkDiagonal({
                        player, row: i, column: j, positiveSlope: true,
                    });
                    // Check diagonal ur-dl
                    this.checkDiagonal({
                        player, row: i, column: j, positiveSlope: false,
                    });

                } else {
                    boardIsFull = false;
                }
            }
        }

        if (this.onProgress && boardIsFull) {
            // Makes sure the board isn´t full
            boardIsFull = this.board.every(
                (row) => row.every(
                    (cell) => cell,
                ),
            );

            if (boardIsFull) {
                this.onProgress = false;
            }
        }

    }

    checkLine({ player, row, column, vertical }) {
        if (this.onProgress) {
            const { rows, columns, consecutives } = this.config;

            const [sweepOver, border] = vertical ? [row, rows] : [column, columns];

            let pointer = Math.max(0, sweepOver + 1 - consecutives);
            const limit = Math.min(border - 1, sweepOver + consecutives - 1);

            let consecutivesCount = 0;

            line:
            while (pointer <= limit) {

                const cell = vertical ?
                    this.board[pointer][column] :
                    this.board[row][pointer];

                consecutivesCount = cell === player ?
                    consecutivesCount + 1 : 0;

                if (consecutivesCount >= consecutives) {
                    this.winner = player;
                    break line;
                }

                pointer++;
            }
        }
    }

    checkDiagonal({ player, row, column, positiveSlope }) {
        if (this.onProgress) {
            const { rows, columns, consecutives } = this.config;

            let verticalPointer = Math.max(0, row + 1 - consecutives);
            const verticalLimit = Math.min(rows - 1, row + consecutives - 1);

            let horizontalSmaller = Math.max(0, column + 1 - consecutives);
            let horizontalGreater = Math.min(columns - 1, column + consecutives - 1);

            let consecutivesCount = 0;

            line:
            while (verticalPointer <= verticalLimit && horizontalSmaller <= horizontalGreater) {

                const cell = positiveSlope ?
                    this.board[verticalPointer][horizontalSmaller] :
                    this.board[verticalPointer][horizontalGreater];

                consecutivesCount = cell === player ?
                    consecutivesCount + 1 : 0;

                if (consecutivesCount >= consecutives) {
                    this.winner = player;
                    break line;
                }

                verticalPointer++;
                if (positiveSlope) {
                    horizontalSmaller++;
                } else {
                    horizontalGreater--;
                }
            }
        }
    }

}