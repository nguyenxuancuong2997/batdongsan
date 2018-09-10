import { Injectable } from '@angular/core';
import { HttpService } from '../../_base/services/http.service';
import { Config } from '../modules/_config/config';

@Injectable()
export class ProductService {

    constructor(private http: HttpService) { }
    
    public getInit(search: string) {
        let url = `${Config.ip}/api/salProduct/list`;
        var params = this.http.SearchTojson(search);
        return this.http.getApiAsync<any>(url, params);
    }

    public getInitParams(params: any) {
        let url = `${Config.ip}/api/salProduct/list`;
        return this.http.getApiAsync<any>(url, params);
    }

    public getData(params: any = null) {
        let url = `${Config.ip}/api/salProduct/listdata`;
        return this.http.getApiAsync<any[]>(url, params);
    }

    public getDetail(id: any)
    {
        let url = `${Config.ip}/api/salProduct/detail`;
        return this.http.getApiAsync<any>(url, {id : id});
    }

}
