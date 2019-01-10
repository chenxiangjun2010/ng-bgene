import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Container } from 'app/domain';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';

@Injectable()
export class SampleContainerService {
    private readonly domain = 'sampleContainer';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    add(container: Container): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/addContainer`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, {name:container}, { headers: headers }).pipe(
            map(res => res)
        )
    }

    update(container: Container): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/container/${container.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.patch(uri, JSON.stringify(container), { headers: headers }).pipe(
            map(res => res)
        )
    }

    del(container: Container): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${container.id}`;
        return this.http.delete(uri).pipe(
            map(res => res)
        )
    }

    get(): Observable<Container[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }
}
