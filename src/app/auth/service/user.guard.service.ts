import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserGuardService {

    constructor(private authService: AuthService) { }

    canActivate(): boolean {
        if (this.authService.isAdmin) {
            return true;
        }
        alert('You are not admin!');
        return false;
    }
}
