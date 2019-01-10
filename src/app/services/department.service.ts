import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Department } from 'app/domain';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';
import { resolveCname } from 'dns';

@Injectable()
export class DepartmentService {
    private readonly domain = 'hospital';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    add(department: Department): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/addDepartment`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, JSON.stringify(department), { headers: headers }).pipe(
            map(res => res)
        )
    }

    update(department: Department): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/department/${department.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, JSON.stringify(department), { headers: headers }).pipe(
            map(res => res)
        )
    }

    del(department: Department): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/department/${department.id}`;
        return this.http.delete(uri).pipe(
            map(res => res['data'])
        )
    }

    get(data): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/department/all`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, data, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    getByID(id: number): Observable<Department[]> {
        const uri = `${this.config.getConfig('uri')}/hospital/hospital/${id}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    search(value): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/department/searchDepartment`;
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
