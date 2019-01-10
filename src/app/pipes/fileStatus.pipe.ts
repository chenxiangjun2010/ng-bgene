import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'file' })
export class FileStatusPipe implements PipeTransform {
    transform(value: any): any {
       let num = Number(value);
       let mnum = 1024 * 1024;
       let gnum = 1024 * 1024 * 1024;
       let string = '';
       if(num < 1024){
           string = num.toFixed(2) + 'B';
       }
       else if(num >= 1024 && num < mnum){
           string = (num/1024).toFixed(2) + 'KB';
       }
       else if(num <gnum && num >= mnum){
           string = (num/mnum).toFixed(2) + 'MB';
       }
       else{
          string = (num/gnum).toFixed(2) + "GB"
       }
       return string;
    }
}