import {UploadFile} from 'ng-zorro-antd';

export interface Largefile {
    uploadFile: UploadFile;
    remove: boolean;
    filename:string;
    index:number;
    start:number;
    end:number;
    maxsize:number;
}