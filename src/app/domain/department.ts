import { Hospital } from "./hospital";

export interface Department {
    id?:number;
    name?:string;
    phone?:string;
    address?:string;
    remark?:string;
    hospital?:Hospital;
}
