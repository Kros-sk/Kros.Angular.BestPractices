import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'kros-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
        private router: Router,
        private authService: AuthService) { }
    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    login(pageName: string) {
        this.router.navigate([`${pageName}`]);
    }

    logout() {

    }
}


