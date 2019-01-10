import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TissueType } from 'app/domain';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';

@Injectable()
export class TissueTypeService {
    private readonly domain = 'tissueType';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    add(tissueType: TissueType): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, {name:tissueType}, { headers: headers }).pipe(
            map(res => res)
        )
    }

    update(tissueType: TissueType): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${tissueType.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.patch(uri, JSON.stringify({name:tissueType.name}), { headers: headers }).pipe(
            map(res => res)
        )
    }

    del(tissueType: TissueType): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${tissueType.id}`;
        return this.http.delete(uri).pipe(
            map(res => res)
        )
    }

    get(): Observable<TissueType[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }
}
