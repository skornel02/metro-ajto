import React, {CSSProperties, useState} from "react";
import {doorsPerCart, Metro} from "./App";
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
        textAlign: "center",
        color: "black",
        fontFamily: "'Open Sans', sans-serif",
    }
    const selected: CSSProperties = {
        ...base,
        color: "#F7931E"
    };

    if (props.resources === undefined)
        return null;

    const station = props.resources[props.metro];
    let selectedDoors: number[] = [];
    if (selectedDirection !== undefined && selectedStation !== undefined && props.resources[props.metro][selectedDirection] !== undefined)
        selectedDoors = props.resources[props.metro][selectedDirection][selectedStation];

    const directionsItem = Object.keys(station).map(direction => <h1
        key={direction}
        style={direction === selectedDirection ? selected : base}
        onClick={() => {
            setSelectedDirection(direction);
            setSelectedStation(undefined);
        }}>
        {direction}
    </h1>);

    return (
        <>
            <div style={{margin: "0 auto", maxWidth: "900px", padding: "0 10%"}}>
                <SvgDisplay svg={Metroes[props.metro]} selectedDoors={selectedDoors}/>
                <h3 style={{textAlign: "center", margin: "0"}} hidden={selectedDoors.length === 0}>
                    {selectedDoors.map(selectedDoor => (Math.floor((selectedDoor - 1) / doorsPerCart[props.metro]) + 1)
                        + ". kocsi "
                        + ((selectedDoor - 1) % doorsPerCart[props.metro] + 1)
                        + ". ajtó")
                        .join(" — ")}
                </h3>
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