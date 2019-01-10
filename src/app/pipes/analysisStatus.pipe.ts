import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'analysisStatus' })
export class AnalysisStatusPipe implements PipeTransform {
    transform(value: any): any {
        const map = {
            "0": "开始",
            "1": "审核中",
            "2": "成功",
            "3": "失败",
            "4": "终止",
        }
        return map[value];
    }
}