import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';


@Injectable()
export class AnalyzeProcessService {
    private readonly domain = 'analyzeTemplate';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    get(obj): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, JSON.stringify(obj), { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    search(data): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/search`;
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

    getSelfFlow():Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/private`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,  { headers: headers }).pipe(
            map(res => res['data'])
        )
    }


    getFlowType():Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/templateType`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,  { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    getUsableChat(type): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/findUsableTemplate/${type}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    getPublicDetail(item): Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/detail/${item}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }


    add(data):Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/create`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri,  data,{ headers: headers }).pipe(
            map(res => res)
        )
    }

    update(data):Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/modify/${data.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.patch(uri, data, { headers: headers }).pipe(
            map(res => res)
        )
    }

    del(data):Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${data.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.delete(uri,  { headers: headers }).pipe(
            map(res => res)
        )
    }

    detail(id):Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/template/detail/${id}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,  { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    copy(data):Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/copy`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri,  data,{ headers: headers }).pipe(
            map(res => res)
        )
    }

    //分析流程管理/分析流程接口

    getAnalyzeProcess(obj){
        let uri;
        if(obj.public == "public"){
            uri = `${this.config.getConfig('uri')}/${this.domain}/public`;
        }
        else if(obj.public == "private"){
            uri = `${this.config.getConfig('uri')}/${this.domain}/privatePublic`;
        }
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, JSON.stringify(obj), { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    getAnalyzeType(){
        const uri = `${this.config.getConfig('uri')}/${this.domain}/templateType`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,  { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    searchAnalyzeProcess(data, type:string){
        let uri;
        if(type == "public"){
            uri = `${this.config.getConfig('uri')}/${this.domain}/public/search`;
        }
        else{
            uri = `${this.config.getConfig('uri')}/${this.domain}/private/search`
        }
       
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

}
