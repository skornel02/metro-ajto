import React, {CSSProperties} from "react";
import {DirectionResource, StationResource} from "./VelvetDatasource";

const DoorSelector: React.FunctionComponent<{
    stations: StationResource,
    selectedStation: string | undefined,
    selectStation: (door: string) => void,
}> = props => {
    const base: CSSProperties = {

    };
    const selected: CSSProperties = {
        ...base,
        color: "darkred",
    }

    const options = Object.keys(props.stations).map(station => <li key={station}
                                                                   style={station === props.selectedStation ? selected : base}
                                                                   onClick={() => {
                                                                       props.selectStation(station)
                                                                   }}>
        {station}
    </li>)

    return (
        <ul>
            {options}
        </ul>
    );
}

export default DoorSelector;