import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hospital } from 'app/domain';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';

@Injectable()
export class HospitalService {
    private readonly domain = 'hospital';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    add(hospital: Hospital): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/addHospital`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, JSON.stringify(hospital), { headers: headers }).pipe(
            map(res => res)
        )
    }

    update(hospital: Hospital): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/hospital/${hospital.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, JSON.stringify(hospital), { headers: headers }).pipe(
            map(res => res)
        )
    }

    del(hospital: Hospital): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${hospital.id}`;
        return this.http.delete(uri).pipe(
            map(res => res['data'])
        )
    }

    get(): Observable<Hospital[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/hospital/all`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    search(value): Observable<Hospital[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/hospital`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri,{name:value.name},{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }

}
