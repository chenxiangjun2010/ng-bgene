import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';

@Injectable()
export class TaskDataService {
    private readonly domain = 'analyze';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    del(taskData: any): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${taskData.id}`;
        return this.http.delete(uri).pipe(
            map(res => res['data'])
        )
    }

    batchDel(taskDatas: any[]): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/batchDelete`;
        const data = taskDatas.map(taskData => ({ "id": taskData.id }));
        return this.http.post(uri, { 'ids': data }).pipe(
            map(res => res['data'])
        )
    }

    getTask(): Observable<any[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/applyable`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    searchTaskDatas(data): Observable<any[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/search`;
        var searchHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Auth-Token': this.tokenService.get().token
        });
        var str = [];
        for (var p in data.value) {
            if (data.value[p] != undefined) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data.value[p]));
            }
        }
        str.push(encodeURIComponent("page") + "=" + encodeURIComponent(data.page));
        str.push(encodeURIComponent("size") + "=" + encodeURIComponent(data.size));
        return this.http.post(uri, str.join("&"), { headers: searchHeaders }).pipe(
            map(res => res['data'])
        )
    }

    detail(id): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/detail/${id}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    reviewDetail(id): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/reviewDetail/${id}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    detailFlow(id): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/detail/flowChat/${id}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    detailFlowStatus(id): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/flowStatus/${id}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    // 分配
    batchAssign(ids): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/assign`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri,ids,{ headers: headers }).pipe(
            map(res => res)
        )
    }

    // 提交
    refer(data): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/submit/${data.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, {},{ headers: headers }).pipe(
            map(res => res)
        )
    }
    // 审核
    adudit(data): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/review/${data.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, data.data,{ headers: headers }).pipe(
            map(res => res)
        )
    }

    termination(data): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/drop/${data.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, {},{ headers: headers }).pipe(
            map(res => res)
        )
    }
    // 申请
    apply(data): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/apply/${data.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri,{}, { headers: headers }).pipe(
            map(res => res)
        )
    }

    // 新增流程
    addChat(data): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/chat`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri,data, { headers: headers }).pipe(
            map(res => res)
        )
    }

    // 运行
    runFlow(data): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/startFlow/${data.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri,data.data, { headers: headers }).pipe(
            map(res => res)
        )
    }

    // 单个工具运行
    singleRunFlow(data): Observable<any> {
        
        const uri = `${this.config.getConfig('uri')}/${this.domain}/startSingleFlow/${data.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri,data.data, { headers: headers }).pipe(
            map(res => res)
        )
    }

    // 终止
    stopFlow(id): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/stopFlow/${id}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res)
        )
    }

    // 重置
    resetAll(id): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/reset/${id}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res)
        )
    }

    resetNode(id,nodeId): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/reset/${id}/${nodeId}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res)
        )
    }

    deleteFile(data): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/deleteResult`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri,data, { headers: headers }).pipe(
            map(res => res)
        )
    }

    getReport(id): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/report/${id}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res)
        )
    }

    saveReport(data): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/report/save`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri,data, { headers: headers }).pipe(
            map(res => res)
        )
    }
}
