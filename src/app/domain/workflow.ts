import { User } from './user';

export interface Workflow {
    id: number,
    name?: string,              //分析流程名称
    description?: string,    //描述
    from?: number,           //来源   系统    个人
    status?: boolean,        //状态
    creator?: User,          //创建人
    createdAt?: Date,     //创建时间
    updatedAt?: Date,    //更新时间
}