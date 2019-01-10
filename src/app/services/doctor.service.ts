import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Doctor } from 'app/domain';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';

@Injectable()
export class DoctorService {
    private readonly domain = 'hospital';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    add(doctor: Doctor): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/addDoctor`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, JSON.stringify(doctor), { headers: headers }).pipe(
            map(res => res)
        )
    }

    update(doctor: Doctor): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/doctor/${doctor.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, JSON.stringify(doctor), { headers: headers }).pipe(
            map(res => res)
        )
    }

    del(doctor: Doctor): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/doctor/${doctor.id}`;
        return this.http.delete(uri).pipe(
            map(res => res)
        )
    }

    get(data): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/doctor/all`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, data, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    getByID(id: number): Observable<Doctor[]> {
        const uri = `${this.config.getConfig('uri')}/doctor/allByID`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, id, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    search(value): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/doctor/searchDoctor`;
        let searchHeader = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Auth-Token': this.tokenService.get().token
        };
        var str = [];
        for (var p in value) {
            if (value[p] != undefined) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(value[p]));
            }
        }
        return this.http.post(uri, str.join("&"), { headers: searchHeader }).pipe(
            map(res => res['data'])
        )
    }

}
