import React, {CSSProperties} from "react";
import {Metro} from "./App";

const MetroSelector: React.FunctionComponent<{
    metro: Metro,
    select: (metro: Metro) => void,
}> = props => {
    const baseStyle: CSSProperties = {
        backgroundColor: "lightgrey",
        borderRadius: "50%",
        width: "7vw",
        height: "7vw",
        padding: "0.25rem",
        marginLeft: "0.25rem",
        marginRight: "0.25rem",
        justifyContent: "center",
        textAlign: "center",
        fontSize: "5vw"
    }
    const M1Style: CSSProperties = {...baseStyle};
    if (props.metro === Metro.M1) {
        M1Style["color"] = "white";
        M1Style["backgroundColor"] = "yellow";
    }
    const M2Style: CSSProperties = {...baseStyle};
    if (props.metro === Metro.M2) {
        M2Style["color"] = "white";
        M2Style["backgroundColor"] = "red";
    }
    const M3Style: CSSProperties = {...baseStyle};
    if (props.metro === Metro.M3) {
        M3Style["color"] = "white";
        M3Style["backgroundColor"] = "blue";
    }
    const M4Style: CSSProperties = {...baseStyle};
    if (props.metro === Metro.M4) {
        M4Style["color"] = "white";
        M4Style["backgroundColor"] = "green";
    }

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={baseStyle}>
                M
            </div>
            <div style={M1Style} onClick={() => props.select(Metro.M1)}>
                1
            </div>
            <div style={M2Style} onClick={() => props.select(Metro.M2)}>
                2
            </div>
            <div style={M3Style} onClick={() => props.select(Metro.M3)}>
                3
            </div>
            <div style={M4Style} onClick={() => props.select(Metro.M4)}>
                4
            </div>
        </div>
    );
};

export default MetroSelector;