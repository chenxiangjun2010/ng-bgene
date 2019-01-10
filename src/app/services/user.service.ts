import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'app/domain';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';

@Injectable()
export class UserService {
    private readonly domain = 'sysUser';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    add(user: User): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, JSON.stringify(user), { headers: headers }).pipe(
            map(res => res)
        )
    }

    update(user: User): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${user.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.patch(uri, JSON.stringify(user), { headers: headers }).pipe(
            map(res => res)
        )
    }
    updateCurrentUser(user: User): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/current`;
        let headers = this.tokenService.get().headers;
        return this.http.patch(uri, JSON.stringify(user), { headers: headers }).pipe(
            map(res => res)
        )
    }
    del(user: User): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${user.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.delete(uri,{ headers: headers }).pipe(
            map(res => res)
        )
    }

    batchDel(users: User[]): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/batchDelete`;
        const data = users.map(user => ({ "id": user.id }));
        return this.http.post(uri, { 'ids': data }).pipe(
            map(res => res['data'])
        )
    }

    get(): Observable<User[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }
    getCurrentUser(): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/current`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    searchUsers(data): Observable<User[]> {
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

    getUserByType(UserTypeId): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/programChild/userInfo/${UserTypeId}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }
    // 获取审核人员
    getReviewer(): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/loadReview`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }

}
