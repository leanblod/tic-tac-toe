import { useState } from "react";
import Square from "./square.component";

export default function Board({grid, onClick}) {

    const rows = [];
    for(let i = 0; i < grid.length; i++) {
        const columns = [];
        for(let j = 0; j < grid[0].length; j++) {
            columns.push(
                <Square key={`cell-${i},${j}`} value={grid[i][j]} position={{row:i, column:j}} onClick={onClick}/>
            )
        }
        rows.push(
            <div key={`row-${i}`} className="board-row">
                {columns}
            </div>
        );
    }

    return (
        <div className="board">
            {rows}
        </div>
    );
}