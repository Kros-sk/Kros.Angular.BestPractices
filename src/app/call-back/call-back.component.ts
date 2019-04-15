import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
    selector: 'kros-call-back',
    templateUrl: './call-back.component.html',
    styleUrls: ['./call-back.component.scss']
})
export class CallBackComponent implements OnInit {

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.authService.completeAuthentication().then(() => {
            window.history.replaceState({},
                window.document.title,
                window.location.origin);
            window.location.href = '/todo';
        }, error => {
            console.error(error);
        });
    }

}
