import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { Container } from 'app/domain';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';

@Injectable()
export class ContainerService {
    private readonly domain = 'container';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    add(container: Container): Observable<Container> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, JSON.stringify(container), { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    update(container: Container): Observable<Container> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${container.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.patch(uri, JSON.stringify(container), { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    del(container: Container): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${container.id}`;
        return this.http.delete(uri).pipe(
            map(res => res['data'])
        )
    }


    get(): Observable<Container[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/query`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }
}
