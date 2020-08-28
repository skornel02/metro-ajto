import React, {useEffect, useState} from "react";

const SvgDisplay: React.FunctionComponent<{ svg: string, selectedDoors: number[] }> = props => {
    const [color, setColor] = useState<string>("green");
    let style = "";
    for (let selectedDoor of props.selectedDoors) {
        style += `
        #door-${selectedDoor}{
            fill: ${color};
        }
    `
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (color === "green") {
                setColor("orange");
            } else {
                setColor("green");
            }
        }, 500);
        return () => {
            clearInterval(interval);
        }
    })
    return (
        <>
            <style>
                {style}
            </style>
            <div dangerouslySetInnerHTML={{__html: props.svg}}/>
        </>
    )
}

export default SvgDisplay;