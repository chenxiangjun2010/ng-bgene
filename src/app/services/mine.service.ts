import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { User } from 'app/domain';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';

@Injectable()
export class MineService {
    private readonly domain = 'sysUser';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    getSampleCount(type): Observable<any[]> {
        const uri = `${this.config.getConfig('uri')}/sample/count/${type}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }
    getTestSampleCount(type): Observable<any[]> {
        const uri = `${this.config.getConfig('uri')}/programChild/finishCount/${type}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }
    getTestAuditCount(type): Observable<any[]> {
        const uri = `${this.config.getConfig('uri')}/experiment/review/${type}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }
    getProjectCount(type): Observable<any[]> {
        const uri = `${this.config.getConfig('uri')}/program/myProgram/${type}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }
    getAnalysisCount(type): Observable<any[]> {
        const uri = `${this.config.getConfig('uri')}/analyze/myAnalyze/${type}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }
    getAnalysisAuditCount(type): Observable<any[]> {
        const uri = `${this.config.getConfig('uri')}/analyze/ReviewAnalyze/${type}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }
    getTaskData(page,size): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/experiment/flow/${page}/${size}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }
    getAnalysisData(page,size): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/analyze/review/${page}/${size}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }
    // 获取样本总量及使用量
    getTestTube(): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/sample/icebox`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }
    // 获取未完成检测项目及未申领检测项目
    getUnProjects(): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/program/unfinishedProgram`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }
    // 获取实验概况
    getExperimentStatus(): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/programChild/experiment`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }
    // 实验审核概况
    getUnReExperiment(): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/experiment/review`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    getIoInfo(): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/info`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    getAnalysisStatus(): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/analyze/apply`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }
}
