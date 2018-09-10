import { Injectable } from '@angular/core';
import { HttpService } from '../../_base/services/http.service';
import { Config } from '../modules/_config/config';

@Injectable()
export class CategoryService {

    constructor(private http: HttpService) { }
    
    public getData() {
        let url = `${Config.ip}/api/newcategory/listdata`;
        return this.http.getApiAsync<any[]>(url, null);
    }

    public getDetail(params: any)
    {
        let url = `${Config.ip}/api/newcategory/detail`;
        return this.http.getApiAsync<any>(url, params);
    }

}