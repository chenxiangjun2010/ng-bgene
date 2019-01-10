import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';

@Injectable()
export class FlowSetService {
    private readonly domain = 'analyzeTemplateType';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    add(FlowSet: any): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, JSON.stringify(FlowSet), { headers: headers }).pipe(
            map(res => res)
        )
    }

    update(FlowSet: any): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${FlowSet.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.patch(uri, JSON.stringify(FlowSet), { headers: headers }).pipe(
            map(res => res)
        )
    }

    del(FlowSet: any): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${FlowSet.id}`;
        return this.http.delete(uri).pipe(
            map(res => res)
        )
    }

    get(): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }
}
