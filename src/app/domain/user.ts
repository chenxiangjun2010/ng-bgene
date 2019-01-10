
export interface User {
    id?: string;
    name: string;
    no?: string;
    trueName: String;
    exReviewer?:User;
    anReviewer?:User;
    gender?: string;
    phone?: string;
    password: string;
    status?: number;
    remark?: string;
    creator?: User;
    deleter?: User;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    userTypes?:UserType[];
}

export interface UserType{
    id?:string;
    name?:string;
}