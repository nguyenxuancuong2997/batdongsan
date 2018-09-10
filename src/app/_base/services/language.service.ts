import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LanguageService {

    private langData: any[] = [
        { txt: 'ENG', value: 'en' },
        { txt: 'VIE', value: 'vi' },
    ];
    private langDefault: string = 'vi';
    private data$ = new BehaviorSubject<any>(this.onInit());
    constructor(private translate: TranslateService) {}

    private onInit() {
        var lang:string[] = [];
        this.langData.forEach(x => {
            lang.push(x.value);
        });
        this.translate.addLangs(lang);
        this.translate.setDefaultLang(this.langDefault);
        this.translate.use(this.langDefault);

        try {
            if (localStorage.getItem('Language')) {
                this.translate.use(localStorage.getItem('Language'));
                this.langDefault = localStorage.getItem('Language');
            } else {
                localStorage.setItem('Language', this.langDefault);
            }
            // const browserLang = translate.getBrowserLang();
            // translate.use(browserLang.match(/en|vi/) ? browserLang : 'vi');
        } catch (error) {
            localStorage.setItem('Language', this.langDefault);
        }
        return {
            active: this.langData.filter(x=>x.value == this.langDefault)[0],
            language: this.langData
        };
    }

    public get() {
        return this.data$.asObservable();
    }

    public getLanguage()
    {
        if (localStorage.getItem('Language')) {
            return localStorage.getItem('Language');
        }
        return 'vi';
    }

    public setLanguage(value: string)
    {        
        var index = this.langData.findIndex(x=>x.value == value);
        if (index != -1) {
            localStorage.setItem('Language', value); 
            this.translate.use(this.langData[index].value);              
            this.data$.next({
                active: this.langData[index],
                language: this.langData
            });
                       
        }           
    }
}