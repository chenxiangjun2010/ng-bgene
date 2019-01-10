//软件工具
export interface Tools {
    id: number,
    name?: string,
    version?: string,
    type?: number,
    inputFile?: boolean,
    inputFileSuffix?: string,
    outputFileSuffix?: string,
}

//上传的文件
export interface RawData {
    id: number,
    name?: string,
    suffix?: string,
    url?: string,
    createdAt?: Date,
    isDeleted?: boolean,
}