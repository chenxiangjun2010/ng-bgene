
export interface AnalyzePreData {
    id?:string,
    des?:string;
    name?:string;
    property?:string;
    expand?:boolean;
    analyzdPreDataDetail:AnalyzePreDataDetail[];
}

export interface AnalyzePreDataDetail{
    id?:string;
    name?:string;
    size?:string;
    anthor?:string;
    createTime?:string;
}
