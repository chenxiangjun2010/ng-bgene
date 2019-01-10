import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'SampleStatus' })
export class SampleStatusPipe implements PipeTransform {
    transform(value: any): any {
        const map = {
            "0": "创建",
            "1": "抽提开始",
            "2": "抽提结束",
            "3": "建库开始",
            "4": "建库结束",
            "5": "测序开始",
            "6": "测序结束",
            "7": "分析开始",
            "8": "分析结束",
            "9": "完成",
            "10": "失败",
            "11": "终止",
            "12": "废弃"
        }
        return map[value];
    }
}