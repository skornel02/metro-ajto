import axios from 'axios';
import {doorsPerCart} from "./App";

export interface MetroResource {
    [key: number]: DirectionResource
}

export interface DirectionResource {
    [key: string]: StationResource
}

export interface StationResource {
    [key: string]: number
}

const numberMatcher = /[1-9]\./g;

class VelvetDatasource {
    private metroResource: undefined | MetroResource;

    async getResource(): Promise<MetroResource> {
        if (this.metroResource === undefined)
            this.metroResource = await this.refreshResource();
        return this.metroResource;
    }

    async refreshResource(): Promise<MetroResource> {
        const request: any = await axios.get("https://velvet.hu/assets/static/metrogen.json");
        const data: MetroResource = {};
        for (let metro = 1; metro <= 4; metro++) {
            const externalData: {
                [key: string]: {
                    [key: string]: string[]
                }
            } = request.data["M" + metro];
            const formattedData: DirectionResource = {};
            Object.keys(externalData).forEach((direction: string) => {
                const stations: { [key: string]: string[] } = externalData[direction];
                formattedData[direction] = {}
                Object.keys(stations).forEach(station => {
                    const text = externalData[direction][station][0];
                    const numbers = text.match(numberMatcher)?.map(match => parseInt(match.replace(".", "")));
                    if (numbers) {
                        const cart = numbers[0];
                        let door = (doorsPerCart[metro] * (cart - 1)) + numbers[1];
                        formattedData[direction][station] = door;
                    }
                });
            })
            data[metro] = formattedData;
        }
        return data;
    }
}

export default new VelvetDatasource();