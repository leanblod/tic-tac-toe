import { useEffect, useState } from "react";
import TicTacTocPlayers from "./tic-tac-toc-players.form";
import SimpleField from "./simple-field.form";
import clsx from "clsx";

// const validations = {
//     consecutives: [ validateConsecutives ],
// };

export default function TicTacToeConfig({ config, setConfig }) {

    const [players, setPlayers] = useState(config.players);

    useEffect(() => {
        setPlayers(config.players);
    }, [config]);

    const errors = [];
    const warnings = [];

    if(
        config.columns < config.consecutives
        && config.rows < config.consecutives
        ) {
            errors.push("Con la configuración actual no es posible ganar el juego, agrande el tablero");
        } else if(
            config.columns < config.consecutives
            || config.rows < config.consecutives
        ) {
            warnings.push("Se recomienda que el objetivo en línea no sea mayor que ninguno de los ejes");
        }
    
    return (
        <form className={clsx(
            "config", config.collapsed && "collapsed"
        )} onSubmit={(ev) => {
            ev.preventDefault();
            const form = ev.currentTarget;
            setConfig({
                ...config,
                ...getFormValues(form),
                players: validatePlayers(players),
                expanded: false,
            });
        }}>

            <div className="common-fields">
                <SimpleField type="number"
                    name="rows"
                    defaultValue={config.rows} >
                        Filas
                </SimpleField>
                
                <SimpleField type="number"
                    name="columns"
                    defaultValue={config.columns} >
                        Columnas
                </SimpleField>
                
                <SimpleField type="number"
                    errors={errors}
                    warnings={warnings}
                    name="consecutives"
                    defaultValue={config.consecutives} >
                        En línea
                </SimpleField>
            </div>

            <TicTacTocPlayers players={players} setPlayers={setPlayers} />

            <button type="submit">Actualizar tablero</button>
        </form >
    );
}

function getFormValues(form: HTMLFormElement) {

    const value = {};
    const inputs = form.elements;

    if (inputs.rows?.value) {
        value.rows = validateInt(inputs.rows.value, {min: 0});
    }
    if (inputs.columns?.value) {
        value.columns = validateInt(inputs.columns.value, {min: 0});
    }
    if (inputs.consecutives?.value) {
        value.consecutives = validateInt(inputs.consecutives.value, {min: 0});
    }

    return value;
}

function runValidations(config) {
    
}

function validatePlayers(players: string[]) {
    return players.filter((player)=>player);
}

function validateInt(value, { min, max } = {}) {
    const int = Number.parseInt(value);
    if(min && int < min) {
        return null;
    }
    if(max && int > max) {
        return null;
    }

    return int;
}
