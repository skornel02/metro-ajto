import React, {useEffect, useState} from 'react';
import MetroSelector from "./MetroSelector";
import VelvetDatasource, {MetroResource} from "./VelvetDatasource";
import DirectionSelector from "./DirectionSelector";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export enum Metro {
    M1 = 1,
    M2 = 2,
    M3 = 3,
    M4 = 4,
}

export const doorsPerCart: { [key: number]: number } = {
    1: 2,
    2: 4,
    3: 4,
    4: 4,
}

export const cartsPerMetro: { [key: number]: number } = {
    1: 3,
    2: 5,
    3: 6,
    4: 4,
}

const App: React.FunctionComponent = () => {
    const [metro, setMetro] = useState<Metro>(Metro.M4);
    const [resource, setResource] = useState<MetroResource | undefined>();
    useEffect(() => {
        VelvetDatasource.getResource().then(setResource).catch(e => {
            toast("Nem sikerült betölteni az állomás adatokat! Próbáld újra később...")
        });
    }, [])

    return (
        <div className="App">
            <header className="Picker">
                <MetroSelector metro={metro} select={setMetro}/>
            </header>
            <main>
                <DirectionSelector metro={metro} resources={resource}/>
            </main>
            <footer style={{textAlign: "center"}}>
                Nézzétek meg az adatok tulajdonosának cikkét: <a style={{color: "orange"}}
                                                                 href={"https://velvet.hu/bpma/2015/06/17/metro/"}>velvet.hu</a>
            </footer>
            <ToastContainer/>
        </div>
    );
}

export default App;
