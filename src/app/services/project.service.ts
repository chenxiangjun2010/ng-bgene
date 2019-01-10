import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from 'app/domain';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';

@Injectable()
export class ProjectService {
    private readonly domain = 'program';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    add(formdata: FormData): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}`;
        let headers = new HttpHeaders({
            'X-Auth-Token': this.tokenService.get().token
        });
        return this.http.post(uri, formdata, { headers: headers }).pipe(
            map(res => res)
        )
    }

    update(project): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/modify/${project.id}`;
        let headers = new HttpHeaders({
            'X-Auth-Token': this.tokenService.get().token
        });
        return this.http.post(uri, project.formdata , { headers: headers }).pipe(
            map(res => res)
        )
    }

    del(Project: any): Observable<any> {
        let headers = new HttpHeaders({
            'X-Auth-Token': this.tokenService.get().token
        });
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${Project.id}`;
        return this.http.delete(uri,{ headers: headers }).pipe(
            map(res => res)
        )
    }

    drop(Project): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/drop/${Project.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,{ headers: headers }).pipe(
            map(res => res)
        )
    }

    changeProjectStatus(data): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/changeStatus/${data.id}/${data.status}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,{ headers: headers }).pipe(
            map(res => res)
        )
    }

    get(data): Observable<Project[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/load`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri,data,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    search(data: any): Observable<any> {
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
        return this.http.post(uri, str.join("&"),{ headers: searchHeaders }).pipe(
            map(res => res['data'])
        )
    }

    getType(): Observable<Project[]> {
        const uri = `${this.config.getConfig('uri')}/sampleProperty`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    getAnalyzePreData(data):Observable<any>{
        const uri = `${this.config.getConfig('uri')}/analyzePreData/${data.page}/${data.size}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    searchAnalyzePreData(data): Observable<any>{
        const uri = `${this.config.getConfig('uri')}/analyzePreData/query`;
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
        return this.http.post(uri, str.join("&"),{ headers: searchHeaders }).pipe(
            map(res => res['data'])
        )
    }

    getDetail(projectId): Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/detail/${projectId}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    getDetailFlow(projectId,flow): Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/detail/${projectId}/${flow}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    getDetailResult(projectId,flow): Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/detailResult/${projectId}/${flow}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    getEditDetail(projectId): Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/showModifyElements/${projectId}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    getAnalysisFile(projectId): Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/resultFile/${projectId}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,{ headers: headers }).pipe(
            map(res => res)
        )
    }
    getReportData(projectId): Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/report/${projectId}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    // 统计页面

    getHospital(data): Observable<any>  {
        const uri = `${this.config.getConfig('uri')}/programChild/getCountByHospital`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, data,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }
    getCountType(data): Observable<any>  {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/getCountByType`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, data,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }
    getProjectCount(data): Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/countByTime`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, data,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }
    //修改报告
    updateReport(data,id): Observable<any>  {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/report/save`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri,data,{ headers: headers }).pipe(
            map(res => { 
                return res
            })
        )
    }

    getProgramUserInfo(): Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/userInfo`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }

}
