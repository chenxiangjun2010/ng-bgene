import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';

@Injectable()
export class SopService {
    private readonly domain = 'experimentSop';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    add(formdata: FormData): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}`;
        let headers = new HttpHeaders({
            'X-Auth-Token': this.tokenService.get().token
        });
        return this.http.post(uri,formdata , { headers: headers }).pipe(
            map(res => res)
        )
    }

    update(formdata: FormData,id): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${id}`;
        let headers = new HttpHeaders({
            'X-Auth-Token': this.tokenService.get().token
        });
        return this.http.post(uri, formdata, { headers: headers }).pipe(
            map(res => res)
        )
    }

    del(Sop: any): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${Sop.id}`;
        return this.http.delete(uri).pipe(
            map(res => res)
        )
    }

    batchDel(Sops: any[]): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/batchDelete`;
        const data = Sops.map(Sop => ({ "id": Sop.id }));
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

    searchSops(data): Observable<any[]> {
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

    getSopByName(name: string, id: number): Observable<Number> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/findSopByName`;
        let headers = this.tokenService.get().headers;
        if (id != null) {
            return this.http.post(uri, { "Sopname": name, "id": id }, { headers: headers }).pipe(
                map(res => res['data'])
            )
        } else {
            return this.http.post(uri, { "Sopname": name }, { headers: headers }).pipe(
                map(res => res['data'])
            )
        }
    }

}
