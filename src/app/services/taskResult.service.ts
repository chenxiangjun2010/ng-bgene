import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskResult } from 'app/domain';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';

@Injectable()
export class TaskResultService {
    private readonly domain = 'experimentResultField';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    add(taskResult: any): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, taskResult, { headers: headers }).pipe(
            map(res => res)
        )
    }

    update(taskResult: TaskResult): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${taskResult.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.patch(uri, taskResult, { headers: headers }).pipe(
            map(res => res)
        )
    }

    del(user: TaskResult): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${user.id}`;
        return this.http.delete(uri).pipe(
            map(res => res)
        )
    }

    batchDel(users: TaskResult[]): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/batchDelete`;
        const data = users.map(user => ({ "id": user.id }));
        return this.http.post(uri, { 'ids': data }).pipe(
            map(res => res['data'])
        )
    }

    get(): Observable<TaskResult[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    searchUsers(data): Observable<TaskResult[]> {
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

    getUserByName(name: string, id: number): Observable<Number> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/findUserByName`;
        let headers = this.tokenService.get().headers;
        if (id != null) {
            return this.http.post(uri, { "username": name, "id": id }, { headers: headers }).pipe(
                map(res => res['data'])
            )
        } else {
            return this.http.post(uri, { "username": name }, { headers: headers }).pipe(
                map(res => res['data'])
            )
        }
    }

}
