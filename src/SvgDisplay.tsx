import React, {useEffect, useState} from "react";

const SvgDisplay: React.FunctionComponent<{ svg: string, selectedDoor: number }> = props => {
    const [color, setColor] = useState<string>("green");
    const style = props.selectedDoor === 0 ? "" : `
        #door-${props.selectedDoor}{
            fill: ${color};
        }
    `;
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