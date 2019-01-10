import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Refrigerator } from 'app/domain';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';

@Injectable()
export class RefrigeratorService {
    private readonly domain = 'iceBox';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    add(Refrigerator: Refrigerator): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/iceBox`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, JSON.stringify(Refrigerator), { headers: headers }).pipe(
            map(res => res)
        )
    }

    update(Refrigerator: Refrigerator): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/iceBox/${Refrigerator.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.patch(uri, JSON.stringify(Refrigerator), { headers: headers }).pipe(
            map(res => res)
        )
    }

    getId(Refrigerator: any): Observable<Refrigerator[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${Refrigerator.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }
    
    getDetailId(Refrigerator:any):Observable<Refrigerator[]>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/detail/${Refrigerator.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    del(Refrigerator: Refrigerator): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/iceBox/${Refrigerator.id}`;
        return this.http.delete(uri).pipe(
            map(res => res)
        )
    }

    batchDel(Refrigerators: Refrigerator[]): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/batchDelete`;
        const data = Refrigerators.map(Refrigerator => ({ "id": Refrigerator.id }));
        return this.http.post(uri, { 'ids': data }).pipe(
            map(res => res['data'])
        )
    }

    get(): Observable<Refrigerator[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/all`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }
    getBrief(): Observable<Refrigerator[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/all/brief/1`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }
    getAllBrief(): Observable<Refrigerator[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/all/brief/2`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }
    searchRefrigerators(data): Observable<Refrigerator[]> {
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

    getRefrigeratorByName(name: string, id: number): Observable<Number> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/findRefrigeratorByName`;
        let headers = this.tokenService.get().headers;
        if (id != null) {
            return this.http.post(uri, { "Refrigeratorname": name, "id": id }, { headers: headers }).pipe(
                map(res => res['data'])
            )
        } else {
            return this.http.post(uri, { "Refrigeratorname": name }, { headers: headers }).pipe(
                map(res => res['data'])
            )
        }
    }

}
