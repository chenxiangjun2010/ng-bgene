import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';

@Injectable()
export class ReportService {
    private readonly domain = 'report';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    getReport(id): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${id}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    saveReport(data,id): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/save`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri,data, { headers: headers }).pipe(
            map(res => res)
        )
    }

}
