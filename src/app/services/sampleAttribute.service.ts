import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';
import { SampleType } from 'app/domain';

@Injectable()
export class SampleAttributeService {
    private readonly domain = 'sampleProperty';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    add(sampleProperty): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri,sampleProperty, { headers: headers }).pipe(
            map(res => res)
        )
    }

    update(sampleProperty): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${sampleProperty.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.patch(uri, JSON.stringify(sampleProperty), { headers: headers }).pipe(
            map(res => res)
        )
    }

    del(sampleProperty): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${sampleProperty.id}`;
        return this.http.delete(uri).pipe(
            map(res => res)
        )
    }

    get(): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res)
        )
    }

    getId(sampleProperty): Observable<any[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${sampleProperty.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }
    
}
