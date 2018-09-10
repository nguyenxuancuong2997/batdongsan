import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

declare var $;

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('Authorization')) {
            return true;
        }
        if ($('#model-login').length > 0) {
            $('#model-login').modal('show'); 
            $('a.nav-link[href="#tab-login"]').click();
            return false;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
