import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';

@Injectable()
export class ProjectSetService {
    private readonly domain = 'programType';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    add(ProjectSet: any): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, JSON.stringify(ProjectSet), { headers: headers }).pipe(
            map(res => res)
        )
    }

    update(ProjectSet: any): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${ProjectSet.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.patch(uri, JSON.stringify(ProjectSet), { headers: headers }).pipe(
            map(res => res)
        )
    }

    del(ProjectSet: any): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${ProjectSet.id}`;
        return this.http.delete(uri).pipe(
            map(res => res)
        )
    }

    batchDel(ProjectSets: any[]): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/batchDelete`;
        const data = ProjectSets.map(ProjectSet => ({ "id": ProjectSet.id }));
        return this.http.post(uri, { 'ids': data }).pipe(
            map(res => res['data'])
        )
    }

    get(): Observable<any[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    getId(ProjectSets): Observable<any[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${ProjectSets}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    getAll():Observable<any[]>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/all`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    searchProjectSets(data): Observable<any[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/findOnCondition`;
        var searchHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Auth-Token': this.tokenService.get().token
        });
        var str = [];
        for (var p in data.value) {
            if (data.value[p] != undefined) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data.value[p]));
            }
            str.push(encodeURIComponent("page") + "=" + encodeURIComponent(data.page));
            str.push(encodeURIComponent("size") + "=" + encodeURIComponent(data.size));
        }
        return this.http.post(uri, str.join("&"), { headers: searchHeaders }).pipe(
            map(res => res['data'])
        )
    }

    getProjectSetByName(name: string, id: number): Observable<Number> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/findProjectSetByName`;
        let headers = this.tokenService.get().headers;
        if (id != null) {
            return this.http.post(uri, { "ProjectSetname": name, "id": id }, { headers: headers }).pipe(
                map(res => res['data'])
            )
        } else {
            return this.http.post(uri, { "ProjectSetname": name }, { headers: headers }).pipe(
                map(res => res['data'])
            )
        }
    }

}
