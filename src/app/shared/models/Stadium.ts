import { Activity } from "./Activity";
import { State } from "./State";

export interface Stadium {
    id: number,
    name: string,
    address: string,
    activity: Activity,
    capacity: string,
    surface: string,
    state: State
}