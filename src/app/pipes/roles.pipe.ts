import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'roles' })
export class RolesPipe implements PipeTransform {
    transform(value: any): any {
        const map = {
            "1": "系统管理员",
            "2": "项目负责人",
            "3": "样本录入人",
            "4": "实验人员",
            "5": "分析人员",
            "6": "实验审核人员",
            "7": "分析审核人员",

        }
        return map[value];
    }
}