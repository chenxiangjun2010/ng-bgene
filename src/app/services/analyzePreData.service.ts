import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sample ,AnalyzePreData} from 'app/domain';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';

@Injectable()
export class AnalyzePreDataService {
    private readonly domain = 'analyzePreData';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    add(data): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/create`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, JSON.stringify(data), { headers: headers }).pipe(
            map(res => res)
        )
    }

    // update(sample: Sample): Observable<Sample> {
    //     const uri = `${this.config.getConfig('uri')}/${this.domain}/${sample.id}`;
    //     let headers = this.tokenService.get().headers;
    //     return this.http.patch(uri, JSON.stringify(sample), { headers: headers }).pipe(
    //         map(res => res['data'])
    //     )
    // }

    del(id): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${id}`;
        return this.http.delete(uri).pipe(
            map(res => res)
        )
    }

    get(data): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${data.page}/${data.size}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    search(data):Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/query`;
        let searchHeader = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Auth-Token': this.tokenService.get().token
        };
        var str = [];
        for (var p in data) {
            if (data[p] != undefined) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
            }
        }
        return this.http.post(uri, str.join("&"), { headers: searchHeader }).pipe(
            map(res => res['data'])
        )
    }

    //用户数据管理/检测项目

    getData(data): Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/programData/${data.page}/${data.size}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    searchData(data):Observable<any>{

        const uri = `${this.config.getConfig('uri')}/${this.domain}/programData/search`;
        let searchHeader = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Auth-Token': this.tokenService.get().token
        };
        var str = [];
        if(data.value != null){
            for (var p in data.value) {
                if (data.value[p] != undefined) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data.value[p]));
                }
            }
        }
        str.push(encodeURIComponent("page") + "=" + encodeURIComponent(data.page));
        str.push(encodeURIComponent("size") + "=" + encodeURIComponent(data.size));
        return this.http.post(uri, str.join("&"), { headers: searchHeader }).pipe(
            map(res => res['data'])
        )
    }

    deleteData(data):Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/programData/deleteFile`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, JSON.stringify(data), { headers: headers }).pipe(
            map(res => res)
        )
    }

    addData(data):Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/add`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, JSON.stringify(data), { headers: headers }).pipe(
            map(res => res)
        )
    }

    deleteOriginData(id):Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/originalFile/${id}`;
        let headers = this.tokenService.get().headers;
        return this.http.delete(uri, { headers: headers }).pipe(
            map(res => res)
        )
    }
    //获取结果分析统计数据
    getResultAnalyze(data): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/resultAnalyze`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, data,{ headers: headers }).pipe(
            map(res => res)
        )
    }
    //获取结果分析统计详情
    getDetailResult(data): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/detailResult`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri,data, { headers: headers }).pipe(
            map(res => res)
        )
    }
}
