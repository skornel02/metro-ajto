import React, {CSSProperties, useState} from "react";
import {Metro} from "./App";
import {MetroResource} from "./VelvetDatasource";
import SvgDisplay from "./SvgDisplay";
import {Metroes} from "./Svg";
import DoorSelector from "./DoorSelector";

const DirectionSelector: React.FunctionComponent<{
    metro: Metro,
    resources: MetroResource | undefined;
}> = props => {
    const [selectedDirection, setSelectedDirection] = useState<string | undefined>();
    const [selectedStation, setSelectedStation] = useState<string | undefined>();

    const base: CSSProperties = {
        fontSize: "1.5rem",
        textAlign: "center"
    }
    const selected: CSSProperties = {
        ...base,
        color: "red"
    };

    if (props.resources === undefined)
        return null;

    const station = props.resources[props.metro];
    let selectedDoor = 0;
    if (selectedDirection !== undefined && selectedStation !== undefined && props.resources[props.metro][selectedDirection] !== undefined)
        selectedDoor = props.resources[props.metro][selectedDirection][selectedStation];

    const directionsItem = Object.keys(station).map(direction => <h1
        style={direction === selectedDirection ? selected : base}
        onClick={() => {
            setSelectedDirection(direction);
            setSelectedStation(undefined);
        }}>
        {direction}
    </h1>);

    return (
        <>
            <div style={{margin: "0 auto", maxWidth: "900px"}}>
                <SvgDisplay svg={Metroes[props.metro]} selectedDoor={selectedDoor}/>
            </div>
            <div style={{display: "flex", justifyContent: "space-around"}}>
                {directionsItem}
            </div>
            {selectedDirection !== undefined && props.resources[props.metro][selectedDirection] !== undefined
                ? <DoorSelector stations={props.resources[props.metro][selectedDirection]}
                                selectedStation={selectedStation}
                                selectStation={setSelectedStation}/>
                : <></>}
        </>
    );
};

export default DirectionSelector;