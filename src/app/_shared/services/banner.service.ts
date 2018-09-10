import { Injectable } from '@angular/core';
import { HttpService } from '../../_base/services/http.service';
import { Config } from '../modules/_config/config';

@Injectable()
export class BannerService {

    constructor(private http: HttpService) { }
    
    public getInit(search: string) {
        let url = `${Config.ip}/api/salbanner/list`;
        var params = this.http.SearchTojson(search);
        return this.http.getApiAsync<any>(url, params);
    }

    public getData(params: any = null) {
        let url = `${Config.ip}/api/salbanner/listdata`;
        return this.http.getApiAsync<any[]>(url, params);
    }

}