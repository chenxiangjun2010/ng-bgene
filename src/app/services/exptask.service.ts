import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { Container, ExpTask } from 'app/domain';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';

@Injectable()
export class ExptaskService {
    private readonly domain = 'experiment';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    add(exptask): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/experiment`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, JSON.stringify(exptask), { headers: headers }).pipe(
            map(res => res)
        )
    }

    update(exptask: ExpTask): Observable<ExpTask> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${exptask.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.patch(uri, JSON.stringify(exptask), { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    del(exptask: ExpTask): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${exptask.id}`;
        return this.http.delete(uri).pipe(
            map(res => res['data'])
        )
    }


    get(data): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, data, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    submit(exptask: ExpTask): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/submit/${exptask.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.patch(uri,"", { headers: headers }).pipe(
            map(res => res)
        )
    }

    review(exptask: any): Observable<ExpTask> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/review`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri,JSON.stringify(exptask), { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    finish(exptask: ExpTask): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/drop/${exptask.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.patch(uri, { headers: headers }).pipe(
            map(res => res)
        )
    }

    searchExptask(data): Observable<any> {
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

    showDetail(data): Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/detail/${data}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    showLastResult(data):Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/lastResult/${data}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    showResult(data):Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/result/${data}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    saveExp(id:number, data:any):Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/save/${id}`;
        let headers = this .tokenService.get().headers;
        return this.http.patch(uri,JSON.stringify(data), { headers: headers }).pipe(
            map(res => res)
        )
    }

    converseData(data:any):Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/transfer/${data.id}`;
        let headers = this .tokenService.get().headers;
        return this.http.post(uri, data.value,headers).pipe(
            map(res => res)
        )
    }

    showConverseDetail(data:any):Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/getTransfer/${data}`;
        let headers = this .tokenService.get().headers;
        return this.http.get(uri, headers).pipe(
            map(res => res['data'])
        )
    }
}