import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { Database } from 'app/domain';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';

@Injectable()
export class DatabaseService {
    private readonly domain = 'database';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    add(database: Database): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, JSON.stringify(database), { headers: headers }).pipe(
            map(res => res)
        )
    }

    update(database: Database): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${database.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.patch(uri, JSON.stringify(database), { headers: headers }).pipe(
            map(res => res)
        )
    }

    del(database: Database): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${database.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.delete(uri,  { headers: headers }).pipe(
            map(res => res)
        )
    }


    get(): Observable<Database[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/private`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
       
    }

    getPublic(): Observable<any[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
       
    }

    getDetail(item): Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${item.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }
}
