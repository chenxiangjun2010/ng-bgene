import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';


@Injectable()
export class AnalyzeToolService {
    private readonly domain = 'analyzeTool';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    getType(): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/tooltypes`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    getTools(type): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/tools/${type}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    getTool(id): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${id}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    searchTools(data): Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/tools/search`;
        let searchHeader = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Auth-Token': this.tokenService.get().token
        };
        var str = [];
        for (var p in data.value) {
            if (data.value[p] != undefined) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data.value[p]));
            }
        }
        str.push(encodeURIComponent("page") + "=" + encodeURIComponent(data.page));
        str.push(encodeURIComponent("size") + "=" + encodeURIComponent(data.size));
        return this.http.post(uri, str.join("&"), { headers: searchHeader }).pipe(
            map(res => res['data'])
        )
    }

    getToolInfo(id){
        const uri = `${this.config.getConfig('uri')}/${this.domain}/detail/${id}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

}
