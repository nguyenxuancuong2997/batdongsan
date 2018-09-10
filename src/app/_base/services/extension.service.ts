import { Injectable } from '@angular/core';
import { FormControl, Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { GolobalValid } from '../class/golobal-valid';
import { HttpModel } from '../models/httpModel';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;

@Injectable()
export class ExtensionService {

    private statusData: any[] = [
        { id: 0, value: 'status_db.notactive' },
        { id: 1, value: 'status_db.nomal' },
        { id: 2, value: 'status_db.hiden' },
        { id: 3, value: 'status_db.delete' }
    ];
    private sizeData: any[] = [
        { id: 25, value: '25 dữ liệu' },
        { id: 50, value: '50 dữ liệu' },
        { id: 100, value: '100 dữ liệu' }
    ];
    constructor(
        private fb: FormBuilder, 
        private tsl: TranslateService,
    ) { }

    public getStatusData(){
        return this.statusData;
    }

    public getSizeData(){
        return this.sizeData;
    }

    public getUrlParameter(sParam, search: string = null) {
        if (search == null) { search = window.location.search }
        search = search.replace('?', '');
        var sPageURL = decodeURIComponent(search),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    public getFormGroup(obj: any, valid: boolean = true): FormGroup {
        let formGroup: FormGroup = this.fb.group({});
        obj.forEach(x => {
            if (!x.isObject) {
                let formControl = this.getFormControll(x, valid);
                formGroup.addControl(x.name, formControl);
            } else {
                if (x.isArray) {
                    let formArray: FormArray = this.getFormArray(x);
                    formGroup.addControl(x.name, formArray)
                } else {
                    let formGroupChild: FormGroup = this.getFormGroup(x);
                    formGroup.addControl(x.name, formGroupChild)
                }
            }
        });
        return formGroup;
    }

    public alertDialog(title: string = '', content: string = '', type: string = 'green', okTxt: string = 'shared.ok'): Promise<any> {
        return new Promise(resolve => {
            this.tsl.get([title, content, okTxt]).subscribe(d => {
                $.alert({
                    type: type,
                    title: d[title],
                    content: d[content],
                    buttons: {
                        ok: {
                            text: d[okTxt],
                            keys: ['enter'],
                            action: function () {
                                resolve(true);
                            }
                        }
                    }
                });
            });
        });
    }

    public confirmDialog(title: string = '', content: string = '', type: string = 'green', okTxt: string = 'shared.ok', cancelTxt: string = 'shared.cancel'): Promise<any> {
        return new Promise(resolve => {
            this.tsl.get([title, content, okTxt, cancelTxt]).subscribe(d => {
                $.confirm({
                    type: type,
                    title: d[title],
                    content: d[content],
                    buttons: {
                        ok: {
                            text: d[okTxt],
                            keys: ['enter'],
                            action: function () {
                                resolve(true);
                            }
                        },
                        cancel: {
                            text: d[cancelTxt],
                            keys: ['esc'],
                            action: function () {
                                resolve(false);
                            }
                        }
                    }
                });
            });
        });
    }

    public confirmDialogAdd(): Promise<any> {
        return new Promise(resolve => {
            this.tsl.get(['shared.add.success_title', 'shared.add.success_content', 'shared.add.back', 'shared.add.new']).subscribe(d => {
                $.confirm({
                    type: 'green',
                    title: d['shared.add.success_title'],
                    content: d['shared.add.success_content'],
                    buttons: {
                        ok: {
                            text: d['shared.add.back'],
                            keys: ['enter'],
                            action: function () {
                                resolve(true);
                            }
                        },
                        cancel: {
                            text: d['shared.add.new'],
                            keys: ['esc'],
                            action: function () {
                                resolve(false);
                            }
                        }
                    }
                });
            });
        });
    }

    public confirmDialogEdit(): Promise<any> {
        return new Promise(resolve => {
            this.tsl.get(['shared.edit.success_title', 'shared.edit.success_content', 'shared.edit.back', 'shared.edit.cancel']).subscribe(d => {
                $.confirm({
                    type: 'green',
                    title: d['shared.edit.success_title'],
                    content: d['shared.edit.success_content'],
                    buttons: {
                        ok: {
                            text: d['shared.edit.back'],
                            keys: ['enter'],
                            action: function () {
                                resolve(true);
                            }
                        },
                        cancel: {
                            text: d['shared.edit.cancel'],
                            keys: ['esc'],
                            action: function () {
                                resolve(false);
                            }
                        }
                    }
                });
            });
        });
    }

    public markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            try {
                control.markAsTouched();
                if (control.controls) {
                    control.controls.forEach(c => this.markFormGroupTouched(c));
                }
            } catch (error) { }
        });
    }

    public BindError(formGroup: FormGroup, data: HttpModel<any>, show: boolean = false) {
        data.error.forEach(x => {
            const jsonResult = `{"${x.key}": "${x.value}"}`;
            const result = JSON.parse(jsonResult);
            if (formGroup.contains(x.key)) {
                if (!formGroup.controls[x.key].hasError(x.key)) {
                    formGroup.controls[x.key].setErrors(result);
                }
            } else {
                if (!show && !formGroup.hasError(x.key)) {
                    formGroup.setErrors(result);
                } else {
                    this.alertDialog('', x.value, 'red');
                }
            }
        });
    }

    public RemoveItem(source: any[], item: any) {
        const index = source.findIndex(x => x.id == item.id);
        if (index != -1) {
            source.splice(index, 1);
        }
    }

    public RemoveRangerItem(source: any[], item: any[]) {
        item.forEach(element => {
            const index = source.findIndex(x => x.id == element.id);
            if (index != -1) {
                source.splice(index, 1);
            }
        })
    }

    public AddItem(source: any[], item: any) {
        const index = source.findIndex(x => x.id == item.id);
        if (index == -1) {
            source.push(item);
        }
    }

    public AddRangerItem(source: any[], item: any[]) {
        item.forEach(element => {
            const index = source.findIndex(x => x.id == element.id);
            if (index == -1) {
                source.push(element);
            }
        });
    }

    

    public InsertItem(source: any[], item: any, index: number = 0) {
        source.splice(index, 0, item);
    }

    public SelectItem(source: any[], item: any = null) {
        if (item == null) {
            source.forEach(x => {
                x.selected = true;
            });
        } else {
            const index = source.findIndex(x => x.id == item.id);
            if (index != -1) {
                source[index].selected = true;
            }
        }
    }

    public UnSelectItem(source: any[], item: any = null) {
        if (item == null) {
            source.forEach(x => {
                x.selected = false;
            });
        } else {
            const index = source.findIndex(x => x.id == item.id);
            if (index != -1) {
                source[index].selected = false;
            }
        }
    }

    public CheckSelectAll(source: any[]) {
        for (var index = 0; index < source.length; index++) {
            var x = source[index];
            if (x.selected == undefined) {
                x.selected = false;
            }
            if (x.selected == false) {
                return false;
            }
        }
        return true;
    }

    public MoveItem(source: any[], itemFrom: any, itemTo: any) {
        this.RemoveItem(source, itemFrom);
        const index = source.findIndex(x => x.id == itemTo.id);
        if (index != -1) {
            this.InsertItem(source, itemFrom, index)
        }
    }

    public GetStatus_dbTxt(status: number) {
        return this.statusData.filter(x => x.id == status)[0].value;
    }

    public HtmlEncode(value) {
        // Create a in-memory div, set its inner text (which jQuery automatically encodes)
        // Then grab the encoded contents back out. The div never exists on the page.
        return $('<div/>').text(value).html();
    }

    public HtmlDecode(value) {
        return $('<div/>').html(value).text();
    }

    public logDebug(mess?: any, ...params: any[]) {
        console.log(mess, params);
    }

    public logInfo(mess?: any, ...params: any[]) {
        console.log(mess, params);
    }

    public logError(mess?: any, ...params: any[]) {
        console.log(mess, params);
    }

    public setFormValue(form: FormGroup, obj: any) {
        for (const key in obj) {
            let value = obj[ key ];
            if (value === undefined) { value = ''; }
            if (form.get(key) !== null) {
                form.get(key).setValue(value);
            }
        }
        return form;
    }

    //-----private-----
    private getFormControll(obj: any, val: boolean = true): FormControl {
        let valid = [];
        if (val) {
            obj.validate.forEach(v => {
                let jsonResult = `{"${v.name}": "${v.value.errorMessage}"}`;
                var result = JSON.parse(jsonResult);
                switch (v.name) {
                    case 'required':
                        valid.push(GolobalValid.required(result));
                        break;
                    case 'compare':
                        //valid.push(Validators.required);
                        break;
                    case 'stringlength':
                        //valid.push(Validators.required);
                        break;
                    case 'minlength':
                        valid.push(Validators.min(v.value.minLength));
                        break;
                    case 'maxlength':
                        valid.push(Validators.min(v.value.maxLength));
                        break;
                    case 'emailaddress':
                        valid.push(GolobalValid.mailFormat(result));
                        break;
                    case 'phone':
                        valid.push(GolobalValid.phone(result));
                        break;
                    case 'regularexpression':
                        //valid.push(Validators.required);
                        break;
                }
            });
        }
        let ctrl: FormControl = this.fb.control(obj.value, valid);
        return ctrl;
    }

    private getFormArray(obj: any): FormArray {
        let lstFormGroup: FormGroup[] = [];
        obj.value.forEach(x => {
            let formGroup: FormGroup = this.getFormGroup(x);
            lstFormGroup.push(formGroup);
        });
        let formArray: FormArray = this.fb.array(lstFormGroup);
        return formArray;
    }
}