import { Inject, Injectable } from '@angular/core';
import { Observable ,Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';

@Injectable()
export class RenderChartService  {
    
    private renderSubject: Subject<any> = new Subject<any>();

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }


    public getRenderSubject(): Observable<any> {
        return this.renderSubject;
    }
    
    public emitRenderInfo(msg: any): void {
        if (msg) {
            this.renderSubject.next(msg);
        }
    }

}
