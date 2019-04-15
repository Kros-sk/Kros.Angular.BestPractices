import { Component } from '@angular/core';

@Component({
    selector: 'kros-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    isLoggedIn() {
        return true;
    }

    login() {

    }

    logout() {

    }
}


