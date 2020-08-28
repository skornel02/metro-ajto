import axios from 'axios';
import {doorsPerCart} from "./App";
import * as localForage from "localforage";

export interface MetroResource {
    [key: number]: DirectionResource
}

export interface DirectionResource {
    [key: string]: StationResource
}

export interface StationResource {
    [key: string]: number[]
}

const numberMatcher = /[1-9]\./g;

class VelvetDatasource {
    private metroResource: undefined | MetroResource;
    private forage = localForage.createInstance({name: "MetroAjto"});

    async getResource(): Promise<MetroResource> {
        if (this.metroResource === undefined)
            this.metroResource = await this.loadResource();
        return this.metroResource;
    }

    async loadResource(): Promise<MetroResource> {
        let cache = await this.forage.getItem<MetroResource>("cache");
        if (cache === null) {
            cache = await this.fetchExternalResource();
            await this.forage.setItem("cache", cache);
        }
        return cache;
    }

    async fetchExternalResource(): Promise<MetroResource> {
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
                        const validDoors: number[] = [];
                        for (let i = 0 ; i < (numbers.length / 2) ; i++) {
                            const cart = numbers[i * 2];
                            let door = (doorsPerCart[metro] * (cart - 1)) + numbers[i * 2 + 1];
                            validDoors.push(door);
                        }
                        formattedData[direction][station] = validDoors;
                    }
                });
            })
            data[metro] = formattedData;
        }
        return data;
    }

    async updateResource() {
        await this.forage.setItem("cache", await this.fetchExternalResource());
    }
}

export default new VelvetDatasource();