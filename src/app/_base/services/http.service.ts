import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { HttpModel } from '../models/httpModel';
import { ErrorModel } from '../models/errorModel';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


declare var $: any;

@Injectable()
export class HttpService {
    constructor(private http: Http, private router: Router) { }

    // getApi
    getApiAsync<T>(url: string, params: any, showErrorDialog: boolean = false, pushState: boolean = false) {
        let result: Promise<HttpModel<T>>;
        let lstError: ErrorModel[] = [];
        // Add params to url
        if (params != null) {
            url += '?' + this.jsonToSearch(params);
            if (pushState) { this.pushState(params) }
        }
        result = this.http.get(url, new RequestOptions({ headers: this.getHeaders() }))
            .toPromise()
            .then(response => {
                let data: HttpModel<T> = response.json();
                lstError = data.error;
                if (showErrorDialog) { this.showMess(lstError); }
                return data;
            })
            .catch(err => {
                lstError = this.handleError(err);
                this.showMess(lstError);
                return new HttpModel<T>(false, lstError, null, null, false);
            });
        return result;
    }

    // postApi
    postApiAsync<T>(url: string, body: any, showErrorDialog: boolean = false) {
        let result: Promise<HttpModel<T>>;
        let lstError: ErrorModel[] = [];
        result = this.http.post(url, body, new RequestOptions({ headers: this.postHeaders() }))
            .toPromise()
            .then(response => {
                let data: HttpModel<T> = response.json();
                lstError = data.error;
                if (showErrorDialog) { this.showMess(lstError); }
                return data;
            })
            .catch(err => {
                lstError = this.handleError(err);
                this.showMess(lstError);
                return new HttpModel<T>(false, lstError, null, null, false);
            });
        return result;
    }

    // putApi
    putApiSync<T>(url: string, params: any, body: any, showErrorDialog: boolean = false) {
        let result: Promise<HttpModel<T>>;
        let lstError: ErrorModel[] = [];
        // Add params to url
        if (params != null) {
            url += '?' + this.jsonToSearch(params);
        }
        result = this.http.post(url, body, new RequestOptions({ headers: this.postHeaders() }))
            .toPromise()
            .then(response => {
                let data: HttpModel<T> = response.json();
                lstError = data.error;
                if (showErrorDialog) { this.showMess(lstError); }
                return data;
            })
            .catch(err => {
                lstError = this.handleError(err);
                this.showMess(lstError);
                return new HttpModel<T>(false, lstError, null, null, false);
            });
        return result;
    }

    //deleteApi
    deleteApiAsync<T>(url: string, params: any, showErrorDialog: boolean = false) {
        let result: Promise<HttpModel<T>>;
        let lstError: ErrorModel[] = [];
        // Add params to url
        if (params != null) {
            url += '?' + this.jsonToSearch(params);
        }
        result = this.http.delete(url, new RequestOptions({ headers: this.getHeaders() }))
            .toPromise()
            .then(response => {
                let data: HttpModel<T> = response.json();
                lstError = data.error;
                if (showErrorDialog) { this.showMess(lstError); }
                return data;
            })
            .catch(err => {
                lstError = this.handleError(err);
                this.showMess(lstError);
                return new HttpModel<T>(false, lstError, null, null, false);
            });
        return result;
    }

    //upload
    uploadApiAsync<T>(url: string, form: any) {
        let result: Promise<HttpModel<T>>;
        let lstError: ErrorModel[] = [];
        result = this.http.post(url, form, new RequestOptions({ headers: this.uploadHeaders() }))
            .toPromise()
            .then(response => {
                let data: HttpModel<T> = response.json();
                return data;
            })
            .catch(err => {
                lstError = this.handleError(err);
                this.showMess(lstError);
                return new HttpModel<T>(false, lstError, null, null, false);
            });
        return result;
    }

    // Handle
    private redirectError(error: ErrorModel[]) {
        if (error != null && error.length > 0) {
            //logic
            if (error.findIndex(x => x.key == "401") != -1) {
                //to login                
                this.router.navigate(['/login', { returnUrl: this.router.url }]);
                return;
            }
            if (error.findIndex(x => x.key == "403") != -1) {
                //to login and mess not auth
                this.router.navigate(['/login', { returnUrl: this.router.url }]);
                return;
            }
        }
    }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let result: ErrorModel[] = [];
        try {
            switch (error.status) {
                case 401:
                    result.push(new ErrorModel(error.status, 'Trang bạn truy cập yêu cầu cần đăng nhập'));
                    break;
                case 403:
                    result.push(new ErrorModel(error.status, 'Bạn chưa có quyền truy cập vào trang yêu cầu. hãy đăng nhập tài khoản có đủ quyền truy cập'));
                    break;
                default:
                    result.push(new ErrorModel(error.status, error.statusText));
                    break;
            }
        } catch (e) {
            result.push(new ErrorModel("error", error.statusText));
        }
        this.redirectError(result);
        return result;
    }

    // Headers
    private getHeaders() {
        let headers = new Headers();
        if (localStorage.getItem('Authorization')) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('Authorization'));
        }
        if (localStorage.getItem('Language')) {
            headers.append('Language', localStorage.getItem('Language'));
        }
        return headers;
    }

    private postHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8')
        //headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
        if (localStorage.getItem('Authorization')) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('Authorization'));
        }
        if (localStorage.getItem('Language')) {
            headers.append('Language', localStorage.getItem('Language'));
        }
        return headers;
    }

    private uploadHeaders() {
        let headers = new Headers();
        if (localStorage.getItem('Authorization')) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('Authorization'));
        }
        if (localStorage.getItem('Language')) {
            headers.append('Language', localStorage.getItem('Language'));
        }
        return headers;
    }

    // Function Extention
    public jsonToSearch(obj: any) {
        var str = Object.keys(obj).map(function (key) {
            if (Array.isArray(obj[key])) {
                if (obj[key].length > 0) {
                    let result = '';
                    let part = '';
                    for (let index = 0; index < obj[key].length; index++) {
                        const value = obj[key][index];
                        let name = key +`[${index}]`;
                        result += `${part}${name}=${value}`;
                        part = '&';
                    }
                    return result;
                }else{
                    let value = obj[key];
                    if (value == null) { value = '' }
                    return key+'[]' + '=' + value;
                }
            }else{
                let value = obj[key];
                if (value == null) { value = '' }
                return key + '=' + value;
            }            
        }).join('&');
        //encodeURIComponent
        return str;
    }

    public SearchTojson(search: string) {
        if (search == null || search == '') { return null; }
        search = search.replace('?', '');
        return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    }

    public pushState(obj: any) {
        let urlCurent = (window.location.pathname + window.location.search);
        let urlTo = window.location.pathname + '?' + this.jsonToSearch(obj);
        if (urlCurent != urlTo) {
            history.pushState('', '', urlTo);
        }
    }

    public showMess(error: ErrorModel[]) {
        if (error != null && error.length > 0) {
            //error:
            let htmlError = '<ul>';
            for (var i = 0; i < error.length; i++) {
                htmlError += '<li>' + error[i].value + '</li>';
            }
            htmlError += '<ul>';
            $.confirm({
                type: 'red',
                title: '',
                content: htmlError,
                buttons: {
                    ok: {
                        text: 'Ok',
                        keys: ['enter'],
                        action: function () {
                            // try {
                            //     if (error[0] != null) {
                            //         $('input[formcontrolname=' + error[0].key + ']').focus();
                            //     }
                            // } catch (e) { }
                        }
                    }
                }
            });
        }
    }
}