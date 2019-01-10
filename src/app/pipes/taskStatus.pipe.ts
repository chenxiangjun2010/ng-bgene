import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'taskStatus' })
export class TaskStatusPipe implements PipeTransform {
    transform(value: any): any {
        const map = {
            "0": "开始",
            "1": "审核",
            "2": "转换",
            "3": "完成",
            "4": "失败",
            "5": "终止",
        }
        return map[value];
    }
}