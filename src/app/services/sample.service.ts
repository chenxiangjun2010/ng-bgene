import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sample } from 'app/domain';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';

@Injectable()
export class SampleService {
    private readonly domain = 'sample';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    add(sample: Sample): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, JSON.stringify(sample), { headers: headers }).pipe(
            map(res => res)
        )
    }

    update(sample: Sample): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${sample.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.patch(uri, JSON.stringify(sample), { headers: headers }).pipe(
            map(res => res)
        )
    }
    updateSave(sample: Sample): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/save/${sample.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.patch(uri, JSON.stringify(sample), { headers: headers }).pipe(
            map(res => res)
        )
    }
   
    // del(sample: Sample): Observable<any> {
    //     const uri = `${this.config.getConfig('uri')}/${this.domain}/${sample.id}`;
    //     return this.http.delete(uri).pipe(
    //         map(res => res['data'])
    //     )
    // }

    get(data: any): Observable<Sample[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/all`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri,data,{ headers: headers }).pipe(
            map(res => {
                return res['data'];
            })
        )
    }

    search(data): Observable<any>{
        const uri = `${this.config.getConfig('uri')}/sample/query`;
        var searchHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Auth-Token': this.tokenService.get().token
        });
        var str = [];
        for (var p in data.value) {
            if (data.value[p] != undefined) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data.value[p]));
            }
        }
        str.push(encodeURIComponent("page") + "=" + encodeURIComponent(data.page));
        str.push(encodeURIComponent("size") + "=" + encodeURIComponent(data.size));
        return this.http.post(uri, str.join("&"),{ headers: searchHeaders }).pipe(
            map(res => res['data'])
        )
    }

    getById(id: number): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${id}` ;
        return this.http.get(uri).pipe(
            map(res => {
                return res['data'];
            })
        )
    }
    
    unExprimentSimpleByFlow(value): Observable<any>{
        const uri = `${this.config.getConfig('uri')}/programChild/unExperimentSamples`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri,value,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    unExprimentSimple(value): Observable<any>{
        const uri = `${this.config.getConfig('uri')}/programChild/unExperimentSamples/${value.page}/${value.size}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    exprimentSimple(value): Observable<any>{
        const uri = `${this.config.getConfig('uri')}/programChild/experimentedSamples/${value.page-1}/${value.size}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    unownSimple(value): Observable<any>{
        const uri = `${this.config.getConfig('uri')}/programChild/unOwnerSamples/${value.page}/${value.size}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    searchUnownSimple(data): Observable<any>{
        const uri = `${this.config.getConfig('uri')}/programChild/query`;
        var searchHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Auth-Token': this.tokenService.get().token
        });
        var str = [];
        for (var p in data.value) {
            if (data.value[p] != undefined) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data.value[p]));
            }
        }
        str.push(encodeURIComponent("page") + "=" + encodeURIComponent(data.page));
        str.push(encodeURIComponent("size") + "=" + encodeURIComponent(data.size));
        return this.http.post(uri, str.join("&"),{ headers: searchHeaders }).pipe(
            map(res => res['data'])
        )
    }

    apply(data:any):Observable<any>{
        const uri = `${this.config.getConfig('uri')}/programChild/apply/${data.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri,"",{ headers: headers }).pipe(
            map(res => res)
        )
    }

    cancelApply(data:any):Observable<any>{
        const uri = `${this.config.getConfig('uri')}/programChild/cancel/${data.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri,{ headers: headers }).pipe(
            map(res => res)
        )
    }

    distributableSample(samples,userId):Observable<any>{
        const uri = `${this.config.getConfig('uri')}/programChild/distribute/${userId}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri,{sampleIds:samples},{ headers: headers }).pipe(
            map(res => res)
        )
    }
    getHospital(data): Observable<any>  {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/getCountByHospital`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, data,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }
    getType(data): Observable<any>  {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/getCountByTissueType`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, data,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }
    getSampleCount(data): Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/getSampleCount`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, data,{ headers: headers }).pipe(
            map(res => res['data'])
        )
    }
    //设置样本是否剩余
    getIsEmpty(data,id): Observable<any>  {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/empty/${id}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri,data,{ headers: headers }).pipe(
            map(res => { 
                return res
            })
        )
    }

    getUnemptySampty(data: any):Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/unempty`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri,data,{ headers: headers }).pipe(
            map(res => {
                return res['data'];
            })
        )
    }

    searchUnemptySimple(data): Observable<any>{
        const uri = `${this.config.getConfig('uri')}/${this.domain}/queryUnempty`;
        var searchHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Auth-Token': this.tokenService.get().token
        });
        var str = [];
        for (var p in data.value) {
            if (data.value[p] != undefined) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data.value[p]));
            }
        }
        str.push(encodeURIComponent("page") + "=" + encodeURIComponent(data.page));
        str.push(encodeURIComponent("size") + "=" + encodeURIComponent(data.size));
        return this.http.post(uri, str.join("&"),{ headers: searchHeaders }).pipe(
            map(res => res['data'])
        )
    }

}
