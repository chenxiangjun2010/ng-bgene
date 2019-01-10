import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'app/domain';
import { map } from 'rxjs/operators';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';
import { ACLService } from '@delon/acl';
import { MenuService } from '@delon/theme';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient, private config: StartupService, private aclService: ACLService, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService, private menuService: MenuService) {
    }

    login(username: string, password: string): Observable<Auth> {
        const uri = `${this.config.getConfig('uri')}/user/login`;
        return this.http.post(uri, { 'username': username, 'password': password }).pipe(
            map(res => {
                let roles=[];
                if (res == null) {
                    throw '登录失败';
                } else {
                    let header = {
                        'Content-Type': 'application/json',
                        'X-Auth-Token': res['token']
                    }
                    
                    res['types'].forEach(element => {
                        roles.push(element.id.toString())
                    });
                    /* this.tokenService.set({ token: res['token'], name: username, headers: header, roles: res['roles'].split(",") }); */
                    this.tokenService.set({ token: res['token'], name: username, headers: header, roles: roles });
                    this.aclService.setRole(roles);
                    this.menuService.resume();
                }
                return { username: username, token: res['token'], roles: roles };
            })
        )
    }
}
