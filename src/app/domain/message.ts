export interface Message{
    id?:number;
    info?:string;
    from?:string;
    to?:string;
    createTime?:string;
    updateTime?:string;
    read:boolean;
}
