import { clsx } from "clsx";

export function ExpansiblePanel({expanded, children}) {
    return (
        <div className="expansible-panel">
            <div className={clsx(
                "expansible-frame",
                !expanded && "collapsed"
            )}>
                {children}
            </div>
        </div>
    );
}