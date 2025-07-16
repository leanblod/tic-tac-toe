import clsx from "clsx";
import { useState } from "react";

export default function Square({value, position, onClick}) {

    return (
        <button className={clsx('square', onClick && 'clickable')} onClick={() => onClick?.(position)} >{value}</button>
    );
}