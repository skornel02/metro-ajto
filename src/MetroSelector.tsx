import React, {CSSProperties} from "react";
import {Metro} from "./App";

const MetroSelector: React.FunctionComponent<{
    metro: Metro,
    select: (metro: Metro) => void,
}> = props => {
    const css = `@media screen and (min-width: 930px) {
    .selectorRound {
        font-size: 46px !important;
    }
}
    `;

    const baseStyle: CSSProperties = {
        backgroundColor: "lightgrey",
        borderRadius: "50%",
        width: "7vw",
        height: "7vw",
        maxWidth: "65px",
        maxHeight: "65px",
        padding: "0.15rem 0.20rem 0.15rem 0.15rem",
        marginLeft: "0.25rem",
        marginRight: "0.25rem",
        justifyContent: "center",
        textAlign: "center",
        fontSize: "5vw",
        fontFamily: "'Open sans'"
    }
    const M1Style: CSSProperties = {...baseStyle};
    if (props.metro === Metro.M1) {
        M1Style["color"] = "white";
        M1Style["backgroundColor"] = "#FFD800";
    }
    const M2Style: CSSProperties = {...baseStyle};
    if (props.metro === Metro.M2) {
        M2Style["color"] = "white";
        M2Style["backgroundColor"] = "#E41F18";
    }
    const M3Style: CSSProperties = {...baseStyle};
    if (props.metro === Metro.M3) {
        M3Style["color"] = "white";
        M3Style["backgroundColor"] = "#005CA5";
    }
    const M4Style: CSSProperties = {...baseStyle};
    if (props.metro === Metro.M4) {
        M4Style["color"] = "white";
        M4Style["backgroundColor"] = "#48A842";
    }

    return (
        <>
            <style>
                {css}
            </style>
            <div style={{display: "flex", justifyContent: "center"}}>
                <div className="selectorRound" style={baseStyle}>
                    M
                </div>
                <div className="selectorRound" style={M1Style} onClick={() => props.select(Metro.M1)}>
                    1
                </div>
                <div className="selectorRound" style={M2Style} onClick={() => props.select(Metro.M2)}>
                    2
                </div>
                <div className="selectorRound" style={M3Style} onClick={() => props.select(Metro.M3)}>
                    3
                </div>
                <div className="selectorRound" style={M4Style} onClick={() => props.select(Metro.M4)}>
                    4
                </div>
            </div>
        </>
    );
};

export default MetroSelector;