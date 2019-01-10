import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { User } from 'app/domain';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable()
export class MessageService {
    private readonly domain = 'message';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    getTopMessage(): Observable<any[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/top`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    getAll(data): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${data.page}/${data.size}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    changeStatus(data):Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${data}`;
        let headers = this.tokenService.get().headers;
        return this.http.patch(uri,"", { headers: headers }).pipe(
            map(res => res)
        )
    }

    allRead():Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/allRead`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res)
        )
    }
   
}
