import { Activity } from "./Activity";
import { Adresse } from "./Adresse";
import { State } from "./State";

export interface Stadium {
    id?: number,
    name?: string,
    activity?: Activity,
    state?: State,
    address?: Adresse,
    photos?: string[],
    capacity?: string,
    surface?: string,
}