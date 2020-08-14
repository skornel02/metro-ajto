import React, {CSSProperties} from "react";
import {StationResource} from "./VelvetDatasource";

const DoorSelector: React.FunctionComponent<{
    stations: StationResource,
    selectedStation: string | undefined,
    selectStation: (door: string) => void,
}> = props => {
    const base: CSSProperties = {
        fontFamily: "'Open Sans', sans-serif",
        color: "black",
        listStyle: "none",
        textAlign: "center",
    };
    const selected: CSSProperties = {
        ...base,
        color: "#F7931E"
    }

    const options = Object.keys(props.stations).map(station => <li key={station}
                                                                   style={station === props.selectedStation ? selected : base}
                                                                   onClick={() => {
                                                                       props.selectStation(station)
                                                                   }}>
        {station}
    </li>)

    return (
        <ul style={{padding: "0", marginBottom: "50px"}}>
            {options}
        </ul>
    );
}

export default DoorSelector;