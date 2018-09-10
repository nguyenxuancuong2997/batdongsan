import {HttpService} from '../../_base/services/http.service';
import { Injectable } from '@angular/core';
import { Config } from '../modules/_config/config';

@Injectable()
export class ContactService {

    constructor(private http: HttpService) { }
    
        public initData() {
            const url = `${Config.ip}/api/contact/add/`;
            return this.http.getApiAsync(url, null);
        }
    
        public submitData(data: any) {
            const url = `${Config.ip}/api/contact/addData/`;
            return this.http.postApiAsync(url, data);
        }

}