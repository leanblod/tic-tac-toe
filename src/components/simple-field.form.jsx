import { Children, useContext } from "react";

export default function SimpleField({ name, defaultValue , type, label, errors = [], warnings = [], children }) {
    const fieldLabel = label??children;
    return (
        <div className="simple-field">
            <label htmlFor={name}>{fieldLabel}</label>
            <input type={type??"text"}
                id={name}
                name={name}
                defaultValue={defaultValue} />
                {errors.map(
                    (error, i) => <p className="error" key={i}>{error}</p>
                )}
                {warnings.map(
                    (warning, i) => <p className="warning" key={i}>{warning}</p>
                )}
        </div>
    );

}