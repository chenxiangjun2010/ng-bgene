import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';
import { SampleType } from 'app/domain';

@Injectable()
export class SampleTypeService {
    private readonly domain = 'sampleType';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    add(sampleType: SampleType): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri,sampleType, { headers: headers }).pipe(
            map(res => res)
        )
    }

    update(sampleType: SampleType): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${sampleType.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.patch(uri, JSON.stringify(sampleType), { headers: headers }).pipe(
            map(res => res)
        )
    }

    del(sampleType: SampleType): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${sampleType.id}`;
        return this.http.delete(uri).pipe(
            map(res => res)
        )
    }

    get(): Observable<SampleType[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    getId(sampleType: SampleType): Observable<SampleType[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${sampleType.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }
    //获取所有类型
    getAll(): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/all`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }
}
