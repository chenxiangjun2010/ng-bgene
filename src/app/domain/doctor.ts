import { Department } from "./department";
import { Hospital } from "./hospital";

export interface Doctor{
    id?:number;
    name?:string;
    phone?:string;
    address?:string;
    department?:Department;
    hospital?:Hospital
}